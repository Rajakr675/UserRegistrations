
// ==============================< Task >=========================//

let input=require('readline-sync');
let jwt=require("jsonwebtoken");
const knex = require('./Data_base');
// let knex=require("./Data_base")


console.log("1). customer registration  2). admin registration  3).Admin_Login");

let chose_option=input.questionInt('Enter your choice:-');
if(chose_option==1){
    customer_registration();
}
else if(chose_option==2){
    admin_registration()
}
else if(chose_option==3){
    Admin_Login()
}else{
    console.log("sorry invalid choice...!");
}

// ===========================> Page-1 <===========================//

async function customer_registration(){

    let firstName = input.question("Enter Your firstName :- ");
    let lastName = input.question("Enter Your lastName :- ");
    let Email = Email_verify(input.question("Enter Your Email :- "));
    let Password = input.question("Enter Your Password :- ");

    var data = {First_Name:firstName,Last_Name:lastName,Email:Email,Password:Password}
    let Data = await knex('customer_servise').insert(data);
    console.log("You are customer role....!");
}

// ===========================> Page-2 <===========================//

async function admin_registration(){
    // console.log("admin_registration");
    let firstName = input.question("Enter Your firstName :- ");
    let lastName = input.question("Enter Your lastName :- ");
    let Email =  Email_verify(input.question("Enter Your Email :- "));
    let Password = input.question("Enter Your Password :- ");

    var data = {First_Name:firstName,Last_Name:lastName,Email:Email,Password:Password}
    await knex('admin_registration').insert(data);
    console.log("You are admin role...!");

}
// ===========================> Page-3 <===========================//

async function Admin_Login(){

    let CustomerData = await knex('customer_servise')

    let info=await knex("admin_registration");
    let Email=input.question("Enter the email:-");
    let password=input.question("Enter the password:-");

    for(let email of CustomerData){
        if(email.Email == Email){
            console.log('You are not allowed to login from here');
            break
        }else{

            for(let UserInfo of info){
                if(UserInfo.Email == Email){
                    if(UserInfo.Password == password){
                        console.log('Login Successfully...');
                        break
                    }else{
                        console.log('Password is wrong');
                        break
                    }
                }else{
                    console.log('Email is wrong');
                    break
                }
            }
        }
    }
}

// ======================> Email-Authtication <==========================//

function Email_verify(email){
    if(email.includes('@')){
        return email
    }
    console.log('Email is invalid');
    let mail = input.question('Enter the Email :- ')
    return Email_verify(mail)
}