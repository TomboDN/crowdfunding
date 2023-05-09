package com.tombo.springbackend.controllers;

import com.tombo.springbackend.models.*;
import com.tombo.springbackend.payload.request.ContributionRequest;
import com.tombo.springbackend.payload.request.NewCampaignRequest;
import com.tombo.springbackend.payload.request.PerkAmountRequest;
import com.tombo.springbackend.payload.request.PerkRequest;
import com.tombo.springbackend.payload.response.*;
import com.tombo.springbackend.repository.*;
import com.tombo.springbackend.services.FilesStorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    FilesStorageService storageService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CampaignRepository campaignRepository;

    @Autowired
    PerkRepository perkRepository;

    @Autowired
    ContributionRepository contributionRepository;

    @GetMapping("/categories")
    public ResponseEntity<?> getCaterories() {
        return ResponseEntity.ok(new DataResponse<>(categoryRepository.findAll()));
    }

    @PostMapping("/")
    public ResponseEntity<?> createCampaign(@Valid @ModelAttribute NewCampaignRequest newCampaignRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).orElseThrow();
        Category category = categoryRepository.findById(newCampaignRequest.getCategory()).orElseThrow();
        LocalDate end_date = LocalDate.parse(newCampaignRequest.getEnd_date());
        String image_url;
        long campaignCount = campaignRepository.count();
        try {
            image_url = storageService.save(newCampaignRequest.getUploadImage(), campaignCount + 1);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
        Campaign campaign = new Campaign(newCampaignRequest.getTitle(), newCampaignRequest.getGoal_amount(), user, category, image_url, newCampaignRequest.getTagline(), newCampaignRequest.getDescription(), end_date);
        campaignRepository.save(campaign);

        return ResponseEntity.ok(new MessageResponse(campaign.getId().toString()));
    }

    @PostMapping("/{id}/perks")
    public ResponseEntity<?> createPerks(@Valid @RequestBody List<PerkRequest> perks, @PathVariable Long id) {
        Optional<Campaign> optionalCampaign = campaignRepository.findById(id);
        if (optionalCampaign.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Campaign campaign = optionalCampaign.get();
        List<Perk> perkList = new ArrayList<>();
        for (PerkRequest perk : perks) {
            perkList.add(new Perk(perk.getTitle(), perk.getDescription(), perk.getPrice(), campaign));
        }
        if (!perkList.isEmpty()) {
            perkRepository.saveAll(perkList);
            return ResponseEntity.ok().build();
        } else return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}/perks")
    public ResponseEntity<?> getPerks(@PathVariable Long id) {
        Optional<Campaign> optionalCampaign = campaignRepository.findById(id);
        if (optionalCampaign.isEmpty()) return ResponseEntity.notFound().build();
        Campaign campaign = optionalCampaign.get();

        List<Perk> perks = perkRepository.findAllByCampaign(campaign);
        List<PerkResponse> perkResponses = new ArrayList<>();

        for (Perk perk : perks) {
            perkResponses.add(new PerkResponse(perk));
        }

        return ResponseEntity.ok(perkResponses);
    }

    @PostMapping("/{id}/donate")
    public ResponseEntity<?> createContribution(@PathVariable Long id, @Valid @RequestBody ContributionRequest contributionRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).orElseThrow();

        Optional<Campaign> optionalCampaign = campaignRepository.findById(id);
        if (optionalCampaign.isEmpty()) return ResponseEntity.notFound().build();
        Campaign campaign = optionalCampaign.get();

        Map<Perk, Integer> perks = new HashMap<>();
        int amount = 0;
        for (PerkAmountRequest perk : contributionRequest.getPerks()){
            Optional<Perk> optionalPerk = perkRepository.findById(perk.getId());
            if (optionalPerk.isEmpty()) return ResponseEntity.notFound().build();
            perks.put(optionalPerk.get(), perk.getQuantity());
            amount += perk.getPrice() * perk.getQuantity();
        }

        Contribution contribution = new Contribution(user, campaign, perks, amount, contributionRequest.getName(),
                contributionRequest.getEmail(), contributionRequest.getCardNumber(),
                contributionRequest.getCardExpiration(), contributionRequest.getCardCvc());
        contributionRepository.save(contribution);
        campaign.setRaised_amount(campaign.getRaised_amount() + contribution.getAmount());
        campaignRepository.save(campaign);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/")
    public ResponseEntity<?> getCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        List<CampaignItemResponse> responses = new ArrayList<>();
        for (Campaign campaign : campaigns) {
            responses.add(new CampaignItemResponse(campaign));
        }
        if (responses.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCampaign(@PathVariable Long id) {
        Optional<Campaign> optionalCampaign = campaignRepository.findById(id);
        if (optionalCampaign.isEmpty()) return ResponseEntity.notFound().build();
        Campaign campaign = optionalCampaign.get();
        int contributions = contributionRepository.countAllByCampaign(campaign);

        List<Perk> perks = perkRepository.findAllByCampaign(campaign);
        List<PerkResponse> perkResponses = new ArrayList<>();

        for (Perk perk : perks) {
            perkResponses.add(new PerkResponse(perk));
        }

        return ResponseEntity.ok(new CampaignResponse(campaign, perkResponses, contributions));
    }


}
