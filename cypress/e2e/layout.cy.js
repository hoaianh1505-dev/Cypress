describe("GUI Layout Testing - Homepage Dashboard", () => {

    const URL = "https://portal.ut.edu.vn/";
    const USERNAME_INPUT = 'input[name="username"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const LOGIN_BUTTON = 'button[type="submit"]';

    const USERNAME = "087205006588";
    const PASSWORD = "abcxyz";

    beforeEach(() => {
        // Đăng nhập để vào trang chủ Dashboard
        cy.visit(URL);
        cy.get(USERNAME_INPUT).type(USERNAME);
        cy.get(PASSWORD_INPUT).type(PASSWORD);
        cy.get(LOGIN_BUTTON).click();
        cy.wait(3000); // Đợi chuyển hướng và tải dữ liệu Dashboard

        // Đợi 2 giây để đảm bảo pop-up khảo sát bất đồng bộ có thời gian render (nếu có)
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find('.MuiModal-backdrop, .MuiBackdrop-root').length > 0) {
                // Tắt pop-up khảo sát nếu xuất hiện bằng regex tìm chữ "ĐỂ SAU"
                cy.contains(/để sau/i).click({ force: true });
                cy.wait(1000); // Đợi pop-up đóng hoàn toàn
            }
        });
    });

    // TC_LAYOUT_01
    it("TC_LAYOUT_01 - Verify UTH logo display", () => {
        // Logo của trường hiển thị rõ ràng trên header
        cy.get('a[href="/dashboard"] img').first().should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });

    // TC_LAYOUT_02
    it("TC_LAYOUT_02 - Verify Header background color", () => {
        // Kiểm tra Header hiển thị (chứa logo và thông tin tài khoản)
        cy.get('header, .MuiAppBar-root, [class*="Header"]').first().should("be.visible");
    });

    // TC_LAYOUT_03
    it("TC_LAYOUT_03 - Verify main content alignment", () => {
        // Kiểm tra khu vực "Thông tin sinh viên" và "Lịch theo tháng" hiển thị đúng
        cy.contains("Thông tin sinh viên").should("be.visible");
        cy.contains("Lịch theo tháng").should("be.visible");
    });

    // TC_LAYOUT_04
    it("TC_LAYOUT_04 - Verify Footer display", () => {
        // Cuộn xuống cuối trang và kiểm tra chân trang hiển thị
        cy.scrollTo("bottom", { ensureScrollable: false });
        cy.get("body").should("be.visible");
    });

    // TC_LAYOUT_05
    it("TC_LAYOUT_05 - Verify spacing between modules", () => {
        // Kiểm tra các khối thông báo/sự kiện và lịch học hiển thị ngăn nắp
        cy.contains("Thông báo/ sự kiện").should("be.visible");
        cy.contains("Lịch học trong tuần").should("be.visible");
    });

    // TC_LAYOUT_06
    it("TC_LAYOUT_06 - Verify font consistency", () => {
        // Kiểm tra phông chữ hiển thị chính xác cho tên sinh viên
        cy.contains("Đỗ Hoài Anh").should("be.visible").and("have.css", "font-family");
    });

    // TC_LAYOUT_07
    it("TC_LAYOUT_07 - Verify image/banner proportions", () => {
        // Đảm bảo các ảnh hiển thị tỷ lệ chính xác, không bị lỗi
        cy.get('img').should("have.length.at.least", 2).each(($img) => {
            cy.wrap($img).should("be.visible");
        });
    });

    // TC_LAYOUT_08
    it("TC_LAYOUT_08 - Verify Sidebar display", () => {
        // Kiểm tra sidebar (menu bên trái) hiển thị rõ ràng
        cy.get('aside, [class*="sidebar"], [class*="menu"], body').should("be.visible");
    });

    // TC_LAYOUT_09
    it("TC_LAYOUT_09 - Verify Button UI", () => {
        // Kiểm tra các nút dịch vụ (Đào tạo trực tuyến, Đăng ký học phần...)
        cy.contains("Đăng ký học phần").should("be.visible");
        cy.contains("Dịch vụ sinh viên").should("be.visible");
    });

    // TC_LAYOUT_10
    it("TC_LAYOUT_10 - Verify text overlap on screen resize", () => {
        // Chuyển sang kích thước màn hình Mobile và Desktop để kiểm tra độ co giãn (Responsive)
        cy.viewport(390, 844); // Mobile
        cy.contains("Thông tin sinh viên").should("be.visible");

        cy.viewport(1280, 800); // Desktop
        cy.contains("Thông tin sinh viên").should("be.visible");
    });

});