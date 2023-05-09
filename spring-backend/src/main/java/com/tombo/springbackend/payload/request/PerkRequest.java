package com.tombo.springbackend.payload.request;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PerkRequest implements Serializable {
    private String title;
    private String description;
    private double price;
}
