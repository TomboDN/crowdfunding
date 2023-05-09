package com.tombo.springbackend.payload.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewCampaignRequest implements Serializable {
    private Long category;
    private String description;
    private String end_date;
    private double goal_amount;
    private String tagline;
    private String title;
    private MultipartFile uploadImage;
}
