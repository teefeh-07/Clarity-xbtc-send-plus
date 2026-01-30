;; String helper utilities

;; Check if buffer is empty
(define-read-only (is-empty-memo (memo (buff 34)))
    (is-eq (len memo) u0))