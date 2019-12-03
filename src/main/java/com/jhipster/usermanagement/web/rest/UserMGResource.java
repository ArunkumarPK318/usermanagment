package com.jhipster.usermanagement.web.rest;

import com.jhipster.usermanagement.domain.UserMG;
import com.jhipster.usermanagement.repository.UserMGRepository;
import com.jhipster.usermanagement.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhipster.usermanagement.domain.UserMG}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserMGResource {

    private final Logger log = LoggerFactory.getLogger(UserMGResource.class);

    private static final String ENTITY_NAME = "userMG";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserMGRepository userMGRepository;

    public UserMGResource(UserMGRepository userMGRepository) {
        this.userMGRepository = userMGRepository;
    }

    /**
     * {@code POST  /user-mgs} : Create a new userMG.
     *
     * @param userMG the userMG to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userMG, or with status {@code 400 (Bad Request)} if the userMG has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-mgs")
    public ResponseEntity<UserMG> createUserMG(@RequestBody UserMG userMG) throws URISyntaxException {
        log.debug("REST request to save UserMG : {}", userMG);
        if (userMG.getId() != null) {
            throw new BadRequestAlertException("A new userMG cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserMG result = userMGRepository.save(userMG);
        return ResponseEntity.created(new URI("/api/user-mgs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-mgs} : Updates an existing userMG.
     *
     * @param userMG the userMG to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userMG,
     * or with status {@code 400 (Bad Request)} if the userMG is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userMG couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-mgs")
    public ResponseEntity<UserMG> updateUserMG(@RequestBody UserMG userMG) throws URISyntaxException {
        log.debug("REST request to update UserMG : {}", userMG);
        if (userMG.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserMG result = userMGRepository.save(userMG);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userMG.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-mgs} : get all the userMGS.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userMGS in body.
     */
    @GetMapping("/user-mgs")
    public List<UserMG> getAllUserMGS() {
        log.debug("REST request to get all UserMGS");
        return userMGRepository.findAll();
    }

    /**
     * {@code GET  /user-mgs/:id} : get the "id" userMG.
     *
     * @param id the id of the userMG to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userMG, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-mgs/{id}")
    public ResponseEntity<UserMG> getUserMG(@PathVariable Long id) {
        log.debug("REST request to get UserMG : {}", id);
        Optional<UserMG> userMG = userMGRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userMG);
    }

    /**
     * {@code DELETE  /user-mgs/:id} : delete the "id" userMG.
     *
     * @param id the id of the userMG to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-mgs/{id}")
    public ResponseEntity<Void> deleteUserMG(@PathVariable Long id) {
        log.debug("REST request to delete UserMG : {}", id);
        userMGRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
