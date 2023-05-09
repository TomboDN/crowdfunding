package com.tombo.springbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(	name = "contributions")
@Setter
@Getter
public class Contribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="campaign_id", nullable = false)
    @JsonIgnore
    private Campaign campaign;
    @ElementCollection
    @CollectionTable(name = "contribuion_perks", joinColumns = @JoinColumn(name = "contribution_id"))
    @MapKeyColumn(name = "perk_id")
    @Column(name = "perk_amount")
    private Map<Perk, Integer> perks = new HashMap<>();
    private double amount;
    private String name;
    private String email;
    private String cardNumber;
    private LocalDate cardExpiration;
    private String cardCvc;

    public Contribution(User user, Campaign campaign, Map<Perk, Integer> perks, double amount, String name, String email, String cardNumber, LocalDate cardExpiration, String cardCvc) {
        this.user = user;
        this.campaign = campaign;
        this.perks = perks;
        this.amount = amount;
        this.name = name;
        this.email = email;
        this.cardNumber = cardNumber;
        this.cardExpiration = cardExpiration;
        this.cardCvc = cardCvc;
    }

    public Contribution() {

    }
}
