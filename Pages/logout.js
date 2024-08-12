exports.Logout=
class Logout {
    constructor (page){
        this.page =page;
        //his.prof= page.getByRole('button',{name:'logo'});
        //this.signout=page.locator('#mm-header').getByText('Logout');
    }
    async logout(){
        await this.page.locator('#mm-header').getByText('Logout');
        await this.page.getByRole('button',{name:'logo'}).click();  
    }
}
 