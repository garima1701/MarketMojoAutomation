exports.Logout=
class Logout {
    constructor (page){
        this.page =page;
        this.prof="//div/nav[2]/ul/li[3]/div/button/img";
        this.signout="//*[@id='mySidepanelright']/div[2]/a[8]"
    }
    async logout(){
        await this.page.locator(this.prof).click();
        await this.page.locator(this.signout).click();
    }
}
 