package com.jhipster.usermanagement.web.rest;

import com.jhipster.usermanagement.UserManagementApp;
import com.jhipster.usermanagement.domain.UserMG;
import com.jhipster.usermanagement.repository.UserMGRepository;
import com.jhipster.usermanagement.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.jhipster.usermanagement.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserMGResource} REST controller.
 */
@SpringBootTest(classes = UserManagementApp.class)
public class UserMGResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private UserMGRepository userMGRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserMGMockMvc;

    private UserMG userMG;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserMGResource userMGResource = new UserMGResource(userMGRepository);
        this.restUserMGMockMvc = MockMvcBuilders.standaloneSetup(userMGResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserMG createEntity(EntityManager em) {
        UserMG userMG = new UserMG()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return userMG;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserMG createUpdatedEntity(EntityManager em) {
        UserMG userMG = new UserMG()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        return userMG;
    }

    @BeforeEach
    public void initTest() {
        userMG = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserMG() throws Exception {
        int databaseSizeBeforeCreate = userMGRepository.findAll().size();

        // Create the UserMG
        restUserMGMockMvc.perform(post("/api/user-mgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMG)))
            .andExpect(status().isCreated());

        // Validate the UserMG in the database
        List<UserMG> userMGList = userMGRepository.findAll();
        assertThat(userMGList).hasSize(databaseSizeBeforeCreate + 1);
        UserMG testUserMG = userMGList.get(userMGList.size() - 1);
        assertThat(testUserMG.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testUserMG.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testUserMG.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUserMG.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createUserMGWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userMGRepository.findAll().size();

        // Create the UserMG with an existing ID
        userMG.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserMGMockMvc.perform(post("/api/user-mgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMG)))
            .andExpect(status().isBadRequest());

        // Validate the UserMG in the database
        List<UserMG> userMGList = userMGRepository.findAll();
        assertThat(userMGList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserMGS() throws Exception {
        // Initialize the database
        userMGRepository.saveAndFlush(userMG);

        // Get all the userMGList
        restUserMGMockMvc.perform(get("/api/user-mgs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userMG.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getUserMG() throws Exception {
        // Initialize the database
        userMGRepository.saveAndFlush(userMG);

        // Get the userMG
        restUserMGMockMvc.perform(get("/api/user-mgs/{id}", userMG.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userMG.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingUserMG() throws Exception {
        // Get the userMG
        restUserMGMockMvc.perform(get("/api/user-mgs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserMG() throws Exception {
        // Initialize the database
        userMGRepository.saveAndFlush(userMG);

        int databaseSizeBeforeUpdate = userMGRepository.findAll().size();

        // Update the userMG
        UserMG updatedUserMG = userMGRepository.findById(userMG.getId()).get();
        // Disconnect from session so that the updates on updatedUserMG are not directly saved in db
        em.detach(updatedUserMG);
        updatedUserMG
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER);

        restUserMGMockMvc.perform(put("/api/user-mgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserMG)))
            .andExpect(status().isOk());

        // Validate the UserMG in the database
        List<UserMG> userMGList = userMGRepository.findAll();
        assertThat(userMGList).hasSize(databaseSizeBeforeUpdate);
        UserMG testUserMG = userMGList.get(userMGList.size() - 1);
        assertThat(testUserMG.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testUserMG.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testUserMG.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserMG.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingUserMG() throws Exception {
        int databaseSizeBeforeUpdate = userMGRepository.findAll().size();

        // Create the UserMG

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserMGMockMvc.perform(put("/api/user-mgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMG)))
            .andExpect(status().isBadRequest());

        // Validate the UserMG in the database
        List<UserMG> userMGList = userMGRepository.findAll();
        assertThat(userMGList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserMG() throws Exception {
        // Initialize the database
        userMGRepository.saveAndFlush(userMG);

        int databaseSizeBeforeDelete = userMGRepository.findAll().size();

        // Delete the userMG
        restUserMGMockMvc.perform(delete("/api/user-mgs/{id}", userMG.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserMG> userMGList = userMGRepository.findAll();
        assertThat(userMGList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
