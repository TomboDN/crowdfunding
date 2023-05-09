package com.tombo.springbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(	name = "perks")
@Setter
@Getter
public class Perk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private double price;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="campaign_id", nullable = false)
    @JsonIgnore
    private Campaign campaign;

    public Perk(String title, String description, double price, Campaign campaign) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.campaign = campaign;
    }

    public Perk() {

    }
}
