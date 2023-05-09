package com.tombo.springbackend.payload.response;

import com.tombo.springbackend.models.Perk;
import lombok.Data;

@Data
public class PerkResponse {
    private Long id;
    private String title;
    private String description;
    private double price;

    public PerkResponse(Perk perk){
        this.id = perk.getId();
        this.title = perk.getTitle();
        this.description = perk.getDescription();
        this.price = perk.getPrice();
    }

}
