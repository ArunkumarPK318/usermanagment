package com.jhipster.usermanagement.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A App.
 */
@Entity
@Table(name = "app")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class App implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "vesrion")
    private String vesrion;

    @Column(name = "url_path")
    private String urlPath;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "app")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserMG> users = new HashSet<>();

    @OneToMany(mappedBy = "app")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Roles> roles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public App type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVesrion() {
        return vesrion;
    }

    public App vesrion(String vesrion) {
        this.vesrion = vesrion;
        return this;
    }

    public void setVesrion(String vesrion) {
        this.vesrion = vesrion;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public App urlPath(String urlPath) {
        this.urlPath = urlPath;
        return this;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
    }

    public String getName() {
        return name;
    }

    public App name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserMG> getUsers() {
        return users;
    }

    public App users(Set<UserMG> userMGS) {
        this.users = userMGS;
        return this;
    }

    public App addUser(UserMG userMG) {
        this.users.add(userMG);
        userMG.setApp(this);
        return this;
    }

    public App removeUser(UserMG userMG) {
        this.users.remove(userMG);
        userMG.setApp(null);
        return this;
    }

    public void setUsers(Set<UserMG> userMGS) {
        this.users = userMGS;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public App roles(Set<Roles> roles) {
        this.roles = roles;
        return this;
    }

    public App addRoles(Roles roles) {
        this.roles.add(roles);
        roles.setApp(this);
        return this;
    }

    public App removeRoles(Roles roles) {
        this.roles.remove(roles);
        roles.setApp(null);
        return this;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof App)) {
            return false;
        }
        return id != null && id.equals(((App) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "App{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", vesrion='" + getVesrion() + "'" +
            ", urlPath='" + getUrlPath() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
