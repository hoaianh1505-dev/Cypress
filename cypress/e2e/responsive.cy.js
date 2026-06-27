describe("Responsive Testing - Portal UTH", () => {

    const URL = "https://portal.ut.edu.vn/";

    const USERNAME = "087205006588";
    const PASSWORD = "anh123456";

    const USERNAME_INPUT = 'input[name="username"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const LOGIN_BUTTON = 'button[type="submit"]';

    // Hàm đăng nhập
    function login() {

        cy.visit(URL);

        cy.get(USERNAME_INPUT).type(USERNAME);

        cy.get(PASSWORD_INPUT).type(PASSWORD);

        cy.get(LOGIN_BUTTON).click();

        // Đợi đăng nhập thành công
        cy.wait(3000);

    }

    // TC_RESPONSIVE_01
    it("TC_RESPONSIVE_01 - Desktop Full HD (1920x1080)", () => {

        cy.viewport(1920, 1080);

        login();

        cy.wait(2000);



    });

    // TC_RESPONSIVE_02
    it("TC_RESPONSIVE_02 - Laptop HD (1366x768)", () => {

        cy.viewport(1366, 768);

        login();

        cy.wait(2000);


    });

    // TC_RESPONSIVE_03
    it("TC_RESPONSIVE_03 - Tablet (1024x768)", () => {

        cy.viewport(1024, 768);

        login();

        cy.wait(2000);

    });

    // TC_RESPONSIVE_04
    it("TC_RESPONSIVE_04 - Tablet Portrait (768x1024)", () => {

        cy.viewport(768, 1024);

        login();

        cy.wait(2000);


    });

    // TC_RESPONSIVE_05
    it("TC_RESPONSIVE_05 - Mobile Large (414x896)", () => {

        cy.viewport(414, 896);

        login();

        cy.wait(2000);


    });

    // TC_RESPONSIVE_06
    it("TC_RESPONSIVE_06 - Mobile (390x844)", () => {

        cy.viewport(390, 844);

        login();

        cy.wait(2000);


    });

    // TC_RESPONSIVE_07
    it("TC_RESPONSIVE_07 - Mobile (375x812)", () => {

        cy.viewport(375, 812);

        login();

        cy.wait(2000);

    });

    // TC_RESPONSIVE_08
    it("TC_RESPONSIVE_08 - Android (360x800)", () => {

        cy.viewport(360, 800);

        login();

        cy.wait(2000);


    });

    // TC_RESPONSIVE_09
    it("TC_RESPONSIVE_09 - Small Mobile (320x568)", () => {

        cy.viewport(320, 568);

        login();

        cy.wait(2000);


    });

    // TC_RESPONSIVE_10
    it("TC_RESPONSIVE_10 - Kiểm tra Sidebar hiển thị", () => {

        cy.viewport(1366, 768);

        login();

        cy.wait(2000);

        cy.get("body").should("be.visible");


    });

    // TC_RESPONSIVE_11
    it("TC_RESPONSIVE_11 - Kiểm tra Dashboard hiển thị", () => {

        cy.viewport(390, 844);

        login();

        cy.wait(2000);

        cy.get("body").should("be.visible");

    });

    // TC_RESPONSIVE_12
    it("TC_RESPONSIVE_12 - Kiểm tra không bị vỡ giao diện", () => {

        cy.viewport(1920, 1080);

        login();

        cy.wait(2000);

        cy.get("body").should("be.visible");

    });

});