package com.tombo.springbackend.payload.response;

import com.tombo.springbackend.models.Campaign;
import lombok.Data;
@Data
public class CampaignItemResponse {
    private Long id;
    private String category;
    private String end_date;
    private double progress;
    private String tagline;
    private String title;
    private String image_url;

    public CampaignItemResponse(Campaign campaign) {
        this.id = campaign.getId();
        this.category = campaign.getCategory().getName();
        this.end_date = campaign.getEnd_date().toString();
        this.progress = (campaign.getRaised_amount() / campaign.getGoal_amount())*100;
        this.tagline = campaign.getTagline();
        this.title = campaign.getTitle();
        this.image_url = campaign.getImage_url();
    }
}
