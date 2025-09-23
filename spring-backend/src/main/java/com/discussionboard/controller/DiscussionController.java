package com.discussionboard.controller;

import com.discussionboard.model.Discussion;
import com.discussionboard.model.User;
import com.discussionboard.repository.DiscussionRepository;
import com.discussionboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discussions")
@CrossOrigin(origins = "http://localhost:3000")
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepo;

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public List<Discussion> getAll() {
        return discussionRepo.findAll();
    }

    @PostMapping("/{userId}")
    public Discussion createDiscussion(@PathVariable Long userId, @RequestBody Discussion discussion) {
        User user = userRepo.findById(userId).orElseThrow();
        discussion.setAuthor(user);
        return discussionRepo.save(discussion);
    }

    @DeleteMapping("/{id}")
    public String deleteDiscussion(@PathVariable Long id) {
        discussionRepo.deleteById(id);
        return "Deleted";
    }
}
