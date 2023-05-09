package com.tombo.springbackend.repository;

import com.tombo.springbackend.models.Campaign;
import com.tombo.springbackend.models.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContributionRepository extends JpaRepository<Contribution, Long> {
    int countAllByCampaign(Campaign campaign);
}
