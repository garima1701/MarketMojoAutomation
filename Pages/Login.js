exports.Login =
class Login{

    constructor(page){
        this.page=page;
        this.userid="//input[@placeholder='Email Address']";
        this.password="//input[@placeholder='Enter Password']";
        this.submit="//button[@type='submit']";

    }
    async openUrl(){
        await this.page.goto(" https://www.marketsmojo.com/mojofeed/login");
    }
    async login(username,password){
        await this.page.locator(this.userid).fill(usename);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.submit).click();
    }
}