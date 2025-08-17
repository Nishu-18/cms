const listOfAdmins=['test@gmail.com',
    'admin@geekcms.com','nishchalbhardwaj2004@gmail.com']

    export async function isAdmin(session){
        if(!session){
           return false;
        }
        let userEmail=session.user.email.toLowerCase().trim();
        let emailMatch=listOfAdmins.some(singleEmail=>{
            return singleEmail.toLowerCase().trim()===userEmail
        })
        console.log(emailMatch,'email match');
        if(session.user.role=='admin' || emailMatch && session.user?.email) return true;
        return false;
        
    }