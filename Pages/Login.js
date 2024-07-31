exports.Login =
class Login{
    constructor(page){
        this.page=page;
        this.email="//input[@d='username']";
        this.pass="//input[@type='password']";
        this.login="//div/div[2]/form/button";      
    }
     async openurl(){
    await this.page.goto("https://www.marketsmojo.com/mojofeed/login");
    }
    async Email(userid){
      await this.page.locator(this.email).fill(userid);
    }
    async Password(password){
        await this.page.locator(this.pass).fill(password);
    }
    async loginPage(){    
    await this.page.locator(this.login).click();
    }
}