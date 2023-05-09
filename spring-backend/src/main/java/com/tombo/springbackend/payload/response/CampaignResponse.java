package com.tombo.springbackend.payload.response;

import com.tombo.springbackend.models.Campaign;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Data
public class CampaignResponse {
    private String category;
    private String description;
    private String end_date;
    private double goal_amount;
    private double raised_amount;
    private List<PerkResponse> perks;
    private int backers;
    private String tagline;
    private String title;
    private String image_url;

    public CampaignResponse(Campaign campaign, List<PerkResponse> perks, int backers) {
        this.category = campaign.getCategory().getName();
        this.description = campaign.getDescription();
        this.end_date = campaign.getEnd_date().toString();
        this.goal_amount = campaign.getGoal_amount();
        this.raised_amount = campaign.getRaised_amount();
        this.perks = perks;
        this.tagline = campaign.getTagline();
        this.title = campaign.getTitle();
        this.image_url = campaign.getImage_url();
        this.backers = backers;
    }
}
