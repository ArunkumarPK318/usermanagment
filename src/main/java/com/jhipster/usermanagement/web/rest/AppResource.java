package com.jhipster.usermanagement.web.rest;

import com.jhipster.usermanagement.domain.App;
import com.jhipster.usermanagement.repository.AppRepository;
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
 * REST controller for managing {@link com.jhipster.usermanagement.domain.App}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AppResource {

    private final Logger log = LoggerFactory.getLogger(AppResource.class);

    private static final String ENTITY_NAME = "app";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AppRepository appRepository;

    public AppResource(AppRepository appRepository) {
        this.appRepository = appRepository;
    }

    /**
     * {@code POST  /apps} : Create a new app.
     *
     * @param app the app to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new app, or with status {@code 400 (Bad Request)} if the app has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/apps")
    public ResponseEntity<App> createApp(@RequestBody App app) throws URISyntaxException {
        log.debug("REST request to save App : {}", app);
        if (app.getId() != null) {
            throw new BadRequestAlertException("A new app cannot already have an ID", ENTITY_NAME, "idexists");
        }
        App result = appRepository.save(app);
        return ResponseEntity.created(new URI("/api/apps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /apps} : Updates an existing app.
     *
     * @param app the app to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated app,
     * or with status {@code 400 (Bad Request)} if the app is not valid,
     * or with status {@code 500 (Internal Server Error)} if the app couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/apps")
    public ResponseEntity<App> updateApp(@RequestBody App app) throws URISyntaxException {
        log.debug("REST request to update App : {}", app);
        if (app.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        App result = appRepository.save(app);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, app.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /apps} : get all the apps.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of apps in body.
     */
    @GetMapping("/apps")
    public List<App> getAllApps() {
        log.debug("REST request to get all Apps");
        return appRepository.findAll();
    }

    /**
     * {@code GET  /apps/:id} : get the "id" app.
     *
     * @param id the id of the app to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the app, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/apps/{id}")
    public ResponseEntity<App> getApp(@PathVariable Long id) {
        log.debug("REST request to get App : {}", id);
        Optional<App> app = appRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(app);
    }

    /**
     * {@code DELETE  /apps/:id} : delete the "id" app.
     *
     * @param id the id of the app to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/apps/{id}")
    public ResponseEntity<Void> deleteApp(@PathVariable Long id) {
        log.debug("REST request to delete App : {}", id);
        appRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
