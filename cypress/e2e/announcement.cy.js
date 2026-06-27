describe("Announcement Testing", () => {

    const URL = "https://portal.ut.edu.vn/";

    beforeEach(() => {
        cy.visit(URL);
    });

    it("TC_ANN_01 - Kiểm tra phần danh sách Tin tức/Thông báo hiển thị", () => {
        cy.get('[role="tablist"]').should("be.visible");
    });

    it("TC_ANN_02 - Kiểm tra tab Thông báo chung hiển thị", () => {
        cy.get('[role="tab"]').contains("Thông báo chung").should("be.visible");
    });

    it("TC_ANN_03 - Kiểm tra danh sách tin trong tab Thông báo chung hiển thị", () => {
        cy.get('[role="tab"]').contains("Thông báo chung").click();
        cy.get('div[role="tabpanel"]').should("be.visible");
        cy.get('div[role="tabpanel"] a').should("have.length.at.least", 1);
    });

    it("TC_ANN_04 - Chuyển đổi qua tab CTCT- QL Sinh viên", () => {
        cy.get('[role="tab"]').contains("CTCT- QL Sinh viên").click();
        cy.get('[role="tab"]').contains("CTCT- QL Sinh viên").should("have.attr", "aria-selected", "true");
    });

    it("TC_ANN_05 - Chuyển đổi qua tab Thông tin đào tạo", () => {
        cy.get('[role="tab"]').contains("Thông tin đào tạo").click();
        cy.get('[role="tab"]').contains("Thông tin đào tạo").should("have.attr", "aria-selected", "true");
    });

    it("TC_ANN_06 - Kiểm tra hiển thị nút Xem tất cả", () => {
        cy.contains("Xem tất cả").should("be.visible");
    });

    it("TC_ANN_07 - Kiểm tra danh sách tin tức ở trang Xem tất cả", () => {
        cy.contains("Xem tất cả").click();
        cy.url().should("include", "/newfeeds");
        cy.get('a[href^="/newfeeds/"]').should("have.length.at.least", 1);
    });

    it("TC_ANN_08 - Kiểm tra chi tiết tin tức khi click vào một thông báo", () => {
        cy.get('div[role="tabpanel"] a[href^="/newfeeds/"]').first().click();
        cy.url().should("match", /\/newfeeds\/\d+/);
        cy.get("body").should("be.visible");
    });

});
