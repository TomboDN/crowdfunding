package com.tombo.springbackend.payload.request;

import lombok.Data;

@Data
public class PerkAmountRequest {
    private Long id;
    private String title;
    private String description;
    private double price;
    private int quantity;
}
