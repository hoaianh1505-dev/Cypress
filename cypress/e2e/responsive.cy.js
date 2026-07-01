describe("Responsive Testing - Portal UTH", () => {
    const URL = "https://portal.ut.edu.vn/";

    const USERNAME = "087205006588";
    const PASSWORD = "abcxyz";

    const USERNAME_INPUT = 'input[name="username"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const LOGIN_BUTTON = 'button[type="submit"]';

    function login(width, height) {
        cy.viewport(width, height);

        cy.visit(URL);

        cy.get(USERNAME_INPUT).type(USERNAME);

        cy.get(PASSWORD_INPUT).type(PASSWORD);

        cy.get(LOGIN_BUTTON).click();

        // Đảm bảo đăng nhập thành công
        cy.url().should("not.include", "login");
    }

    //==================================================
    // TC_RESPONSIVE_01
    // Desktop Full HD
    //==================================================
    it("TC_RESPONSIVE_01 - Verify Desktop Full HD (1920x1080)", () => {
        login(1920, 1080);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_02
    // Laptop
    //==================================================
    it("TC_RESPONSIVE_02 - Verify Laptop HD (1366x768)", () => {
        login(1366, 768);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_03
    // Tablet Landscape
    //==================================================
    it("TC_RESPONSIVE_03 - Verify Tablet Landscape (1024x768)", () => {
        login(1024, 768);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_04
    // Tablet Portrait
    //==================================================
    it("TC_RESPONSIVE_04 - Verify Tablet Portrait (768x1024)", () => {
        login(768, 1024);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_05
    // Mobile Large
    //==================================================
    it("TC_RESPONSIVE_05 - Verify Mobile Large (414x896)", () => {
        login(414, 896);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_06
    // Mobile
    //==================================================
    it("TC_RESPONSIVE_06 - Verify Mobile (390x844)", () => {
        login(390, 844);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_07
    // iPhone X
    //==================================================
    it("TC_RESPONSIVE_07 - Verify iPhone X (375x812)", () => {
        login(375, 812);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_08
    // Android
    //==================================================
    it("TC_RESPONSIVE_08 - Verify Android (360x800)", () => {
        login(360, 800);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_09
    // Small Mobile
    //==================================================
    it("TC_RESPONSIVE_09 - Verify Small Mobile (320x568)", () => {
        login(320, 568);

        cy.get("body").should("be.visible");

        cy.document().then((doc) => {
            expect(doc.body.scrollWidth).to.be.lte(doc.documentElement.clientWidth);
        });
    });

    //==================================================
    // TC_RESPONSIVE_10
    // Sidebar/Desktop
    //==================================================
    it("TC_RESPONSIVE_10 - Verify Desktop UI", () => {
        login(1366, 768);

        cy.get("body").should("be.visible");

        cy.window().its("innerWidth").should("eq", 1366);
    });

});