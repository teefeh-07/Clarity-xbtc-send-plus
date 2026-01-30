;; xbtc-send-plus
;; Enhanced xBTC send functionality for Clarity 4

;; Error constants
(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-INVALID-AMOUNT (err u101))
(define-constant ERR-TRANSFER-FAILED (err u102))

;; Data variables
(define-data-var contract-owner principal tx-sender)
(define-data-var total-transfers uint u0)

;; Read-only functions
(define-read-only (get-owner)
    (ok (var-get contract-owner)))

(define-read-only (get-total-transfers)
    (ok (var-get total-transfers)))

;; Transfer with tracking
(define-public (transfer-stx-tracked (amount uint) (recipient principal) (memo (buff 34)))
    (begin
        (asserts! (> amount u0) ERR-INVALID-AMOUNT)
        (try! (stx-transfer? amount tx-sender recipient))
        (var-set total-transfers (+ (var-get total-transfers) u1))
        (print memo)
        (ok true)))