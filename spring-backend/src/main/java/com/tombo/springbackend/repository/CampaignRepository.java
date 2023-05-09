package com.tombo.springbackend.repository;

import com.tombo.springbackend.models.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
