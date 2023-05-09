package com.tombo.springbackend.payload.request;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class ContributionRequest {
    private String name;
    private String email;
    private List<PerkAmountRequest> perks;
    private String cardNumber;
    private LocalDate cardExpiration;
    private String cardCvc;
}
