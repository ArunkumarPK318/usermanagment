package com.jhipster.usermanagement.repository;
import com.jhipster.usermanagement.domain.UserMG;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserMG entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserMGRepository extends JpaRepository<UserMG, Long> {

}
