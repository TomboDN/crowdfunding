package com.tombo.springbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Entity
@Table(	name = "campaigns")
@Setter
@Getter
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private double goal_amount;
    private double raised_amount;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="category_id", nullable = false)
    @JsonIgnore
    private Category category;
    private String image_url;
    private String tagline;
    @Column(columnDefinition="TEXT")
    private String description;
    private LocalDate end_date;
    private boolean launch;

    public Campaign(String title, double goal_amount, User user, Category category, String image_url, String tagline, String description, LocalDate end_date) {
        this.title = title;
        this.goal_amount = goal_amount;
        this.user = user;
        this.category = category;
        this.image_url = image_url;
        this.tagline = tagline;
        this.description = description;
        this.end_date = end_date;
        this.raised_amount = 0;
        this.launch = true;
    }

    public Campaign() {

    }
}
