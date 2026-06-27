describe("Navigation Testing", () => {

    const URL = "https://portal.ut.edu.vn/";
    const LOGO_HOME = 'a[href="/dashboard"]';
    
    beforeEach(() => {
        cy.visit(URL);
    });

    it("TC_NAV_01 - Điều hướng về trang chủ khi click Logo", () => {
        cy.get(LOGO_HOME).click();
        cy.url().should("include", "/dashboard");
    });

    it("TC_NAV_02 - Chuyển sang tab Thông báo chung", () => {
        cy.get('[role="tab"]').contains('Thông báo chung').click();
        cy.get('[role="tab"]').contains('Thông báo chung').should('have.attr', 'aria-selected', 'true');
    });

    it("TC_NAV_03 - Chuyển sang tab CTCT- QL Sinh viên", () => {
        cy.get('[role="tab"]').contains('CTCT- QL Sinh viên').click();
        cy.get('[role="tab"]').contains('CTCT- QL Sinh viên').should('have.attr', 'aria-selected', 'true');
    });

    it("TC_NAV_04 - Chuyển sang tab Thông tin đào tạo", () => {
        cy.get('[role="tab"]').contains('Thông tin đào tạo').click();
        cy.get('[role="tab"]').contains('Thông tin đào tạo').should('have.attr', 'aria-selected', 'true');
    });

    it("TC_NAV_05 - Click Xem tất cả để chuyển trang", () => {
        cy.contains('Xem tất cả').click();
        cy.url().should('include', '/newfeeds');
    });

    it("TC_NAV_06 - Quay lại trang chủ từ trang Tin tức", () => {
        cy.visit(URL + "newfeeds");
        cy.get('a[href="/dashboard"]').click();
        cy.url().should('include', '/dashboard');
    });

    it("TC_NAV_07 - Điều hướng vào chi tiết một tin tức", () => {
        cy.get('div[role="tabpanel"] a[href^="/newfeeds/"]').first().click();
        cy.url().should('match', /\/newfeeds\/\d+/);
    });

    it("TC_NAV_08 - Click Logo từ trang chi tiết tin tức để về trang chủ", () => {
        cy.visit(URL + "newfeeds");
        cy.get('a[href^="/newfeeds/"]').first().click();
        cy.get('a[href="/"]').click();
        cy.url().should('include', 'portal.ut.edu.vn');
    });

    it("TC_NAV_09 - Điều hướng qua trang tiếp theo trong danh sách tin tức", () => {
        cy.visit(URL + "newfeeds");
        cy.get('button[aria-label="Go to next page"]').first().click();
        cy.url().should('include', 'page=2');
    });

    it("TC_NAV_10 - Click Quên mật khẩu để hiển thị form/thông báo quên mật khẩu", () => {
        cy.contains("button", "Quên mật khẩu?").click();
        cy.contains("Khôi phục mật khẩu").should("be.visible");
    });

});