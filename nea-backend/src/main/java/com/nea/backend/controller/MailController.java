package com.nea.backend.controller;

import com.nea.backend.dto.MailDTO;
import com.nea.backend.exception.ApiError;
import com.nea.backend.model.Mail;
import com.nea.backend.repository.MailRepository;
import com.nea.backend.security.CurrentUser;
import com.nea.backend.service.MailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/mail")
@Tag(name = "Почта")
@Transactional
@RequiredArgsConstructor
public class MailController {
    private final MailRepository mailRepository;
    private final CurrentUser currentUser;
    private final MailService mailService;

    @PostMapping("/subscribe")
    @Operation(summary = "Подключить пользователя к рассылке")
    public void subscribe() {
        Mail mailSubscribe = new Mail(
                currentUser.getUser().getId()
        );

        try {
            mailRepository.save(mailSubscribe);
        } catch (DataIntegrityViolationException ex) {
            throw new ApiError.UserAlreadySubscribed();
        }
    }

    @PostMapping("/bound")
    @Operation(summary = "Написать нам")
    public void bound(@RequestBody MailDTO dto) {
        mailService.send(
                dto.getEmail(),
                dto.getName(),
                dto.getMessage()
        );
    }
}
