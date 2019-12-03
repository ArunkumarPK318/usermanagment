package com.jhipster.usermanagement.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.usermanagement.web.rest.TestUtil;

public class UserMGTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserMG.class);
        UserMG userMG1 = new UserMG();
        userMG1.setId(1L);
        UserMG userMG2 = new UserMG();
        userMG2.setId(userMG1.getId());
        assertThat(userMG1).isEqualTo(userMG2);
        userMG2.setId(2L);
        assertThat(userMG1).isNotEqualTo(userMG2);
        userMG1.setId(null);
        assertThat(userMG1).isNotEqualTo(userMG2);
    }
}
