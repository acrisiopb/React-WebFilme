package com.bbgcine.overview.web.exception;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbgcine.overview.exception.EntityNotFoundException;
import com.bbgcine.overview.exception.PasswordInvalidException;
import com.bbgcine.overview.exception.UsernameUniqueViolationException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class ApiExceptionHandler {

        @ExceptionHandler(UsernameUniqueViolationException.class)
        public ResponseEntity<ErrorMessage> usernameUniqueViolationException(RuntimeException ex,
                        HttpServletRequest request) {

                log.error("Api Error - ", ex);

                return ResponseEntity.status(HttpStatus.CONFLICT)
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(new ErrorMessage(request,
                                                HttpStatus.CONFLICT, ex.getMessage()));
        }

        @ExceptionHandler(PasswordInvalidException.class)
        public ResponseEntity<ErrorMessage> passwordInvalidException(RuntimeException ex,
                        HttpServletRequest request) {

                log.error("Api Error - ", ex);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(new ErrorMessage(request,
                                                HttpStatus.BAD_REQUEST, ex.getMessage()));
        }

        @ExceptionHandler({ EntityNotFoundException.class })
        public ResponseEntity<ErrorMessage> entityNotFoundException(RuntimeException ex,
                        HttpServletRequest request) {

                log.error("Api Error - ", ex);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(new ErrorMessage(request,
                                                HttpStatus.NOT_FOUND, ex.getMessage()));
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorMessage> methodArgumentNotValidException(
                        MethodArgumentNotValidException ex,
                        HttpServletRequest request) {

                BindingResult result = ex.getBindingResult();
                log.error("Api Error - ", ex);

                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(new ErrorMessage(
                                                request,
                                                HttpStatus.UNPROCESSABLE_ENTITY,
                                                "Campo(s) inválido(s)",
                                                result));
        }

}
