// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Bỏ qua lỗi ngoại lệ (uncaught exception) tự động ném ra từ code của trang web
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Chặn popup khảo sát và thông báo toàn cục để không làm gián đoạn kịch bản kiểm thử
beforeEach(() => {
    cy.intercept('GET', '**/api/v1/survey/checkSurvey**', { body: { hasSurvey: false } });
    cy.intercept('GET', '**/api/v1/notification/getPopup**', { body: null });
});

// Thêm delay sau mỗi test case (bật/tắt tại đây khi cần)
afterEach(() => {
    cy.delay(2000);
});