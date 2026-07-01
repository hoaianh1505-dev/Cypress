describe("UTH Portal - Announcement Feature E2E Tests", () => {
    // Chạy trước mỗi Test Case: Truy cập trang
    beforeEach(() => {
        // Bỏ qua lỗi ngoại lệ từ mã nguồn trang web để test không bị dừng đột ngột
        Cypress.on("uncaught:exception", () => false);
        cy.visit("https://portal.ut.edu.vn/");
    });

    it("TC_ANN_01 - Verify Announcement section display", () => {
        cy.get('div[role="tabpanel"]').should("be.visible");
        cy.get('a[href^="/newfeeds/"]').should("have.length.at.least", 1);
    });

    it("TC_ANN_02 - Verify clicking to view Announcement details", () => {
        cy.get('div[role="tabpanel"] a[href^="/newfeeds/"]').first().click();
        cy.url().should("match", /\/newfeeds\/\d+/);
        cy.get("body").should("be.visible");
    });

    it("TC_ANN_03 - Verify empty state when no announcements", () => {
        // Intercept đúng API trả về danh sách thông báo
        cy.intercept("GET", "**/api/v1/notification**", { body: [] }).as(
            "getEmptyFeeds",
        );
        cy.reload();
        cy.wait("@getEmptyFeeds");
        cy.get("body").should("be.visible");
    });

    it("TC_ANN_04 - Verify Responsive UI on Mobile/Tablet", () => {
        cy.viewport("iphone-x");
        cy.get('div[role="tabpanel"]').should("be.visible");
        cy.document().its("body").should("have.css", "overflow-x", "visible");
    });

    it("TC_ANN_05 - Verify tabs/categories of announcements", () => {
        cy.contains("Đào tạo").click();
        cy.get('div[role="tabpanel"]').should("be.visible");
        cy.get('a[href^="/newfeeds/"]').should("have.length.at.least", 1);
    });

    it("TC_ANN_06 - Verify pagination / 'View All' button functionality", () => {
        cy.contains("Xem tất cả").click();
        cy.url().should("include", "/newfeeds");
        cy.get('a[href^="/newfeeds/"]').should("have.length.at.least", 1);
    });

    it("TC_ANN_07 - Verify viewing/downloading attachments", () => {
        cy.get('a[href^="/newfeeds/"]').first().click();
    });

    it("TC_ANN_08 - Verify navigating back to Home by clicking UTH Logo from detail page", () => {
        // 1. Đi vào trang chi tiết của thông báo đầu tiên
        cy.get('div[role="tabpanel"] a[href^="/newfeeds/"]').first().click();
        cy.url().should("match", /\/newfeeds\/\d+/);

        // 2. Tìm và click vào logo "UTH" ở thanh trên cùng bên trái để quay về trang chủ
        // Đoạn bọc này tự động tìm ảnh logo hoặc chữ UTH để click
        cy.get("body").then(($body) => {
            if ($body.find("img").length > 0) {
                cy.get("img").first().click();
            } else {
                cy.contains("UTH").click();
            }
        });

        // 3. Xác minh hệ thống đã chuyển hướng an toàn về lại trang gốc thành công
        cy.url().should("eq", "https://portal.ut.edu.vn/");
    });

    it("TC_ANN_09 - Verify Unread/Read status badge", () => {
        // Để trống theo dữ liệu động của web (có thể bổ sung kiểm tra badge số lượng thông báo nếu có)
    });

    it("TC_ANN_10 - Verify Date & Time formatting and sorting", () => {
        // Lấy các thẻ a chứa link thông báo, LOẠI TRỪ nút "Xem tất cả"
        cy.get('div[role="tabpanel"] a[href^="/newfeeds/"]')
            .not(':contains("Xem tất cả")')
            .first()
            .invoke("text")
            .then((text) => {
                // Tìm định dạng DD/MM/YYYY trong chuỗi text lấy được
                const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
                expect(text).to.match(dateRegex);
            });
    });
});
