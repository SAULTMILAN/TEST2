package com.discussionboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "discussions")   // ✅ map to discussions table
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    // 🔹 Many discussions can belong to one user (author)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // foreign key in discussions table
    private User author;

    // 🔹 Default constructor (required by JPA)
    public Discussion() {}

    // 🔹 All-args constructor
    public Discussion(Long id, String content, User author) {
        this.id = id;
        this.content = content;
        this.author = author;
    }

    // 🔹 Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    // 🔹 toString (for debugging)
    @Override
    public String toString() {
        return "Discussion{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", author=" + (author != null ? author.getUsername() : "null") +
                '}';
    }
}
