import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_pass from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); 
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });
          
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
         })
          
    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).contains('Авторизация прошла успешно');
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.footer).contains('qa.studio'); 
         cy.get(result_page.footer).should('be.visible');
         })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_pass.email).type(data.login);
        cy.get(recovery_pass.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.footer).contains('qa.studio'); 
        cy.get(result_page.footer).should('be.visible'); 
        })

    it('Ввести верный логин и НЕверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(1112345678);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.title).should('be.visible'); 
        cy.get(result_page.footer).contains('qa.studio'); 
        cy.get(result_page.footer).should('be.visible'); 
        })

    it('Ввести НЕверный логин и верный пароль', function () {
            
        cy.get(main_page.email).type('german@1234dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет'); 
        cy.get(result_page.title).should('be.visible'); 
        cy.get(result_page.footer).contains('qa.studio'); 
        cy.get(result_page.footer).should('be.visible'); 
        })

    it('Ввести логин без @ и верный пароль', function () {
            
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); 
        cy.get(result_page.title).should('be.visible'); 
        cy.get(result_page.footer).contains('qa.studio');
        cy.get(result_page.footer).should('be.visible'); 
        })

    it('Ввести логин GerMan@Dolnikov.ru и верный пароль', function () {
            
        cy.get(main_page.email).type(GerMan@Dolnikov.ru);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.footer).contains('qa.studio'); 
        cy.get(result_page.footer).should('be.visible');
        })
 })