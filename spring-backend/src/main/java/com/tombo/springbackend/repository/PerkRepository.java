package com.tombo.springbackend.repository;

import com.tombo.springbackend.models.Campaign;
import com.tombo.springbackend.models.Perk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerkRepository extends JpaRepository<Perk, Long> {
    List<Perk> findAllByCampaign(Campaign campaign);
}
