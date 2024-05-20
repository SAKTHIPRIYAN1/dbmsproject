
import bcrypt from'bcrypt';

const RegisterAlumini=async(req,res)=>{
    const db = req.db;
    console.log(req.body);
    
const body=req.body;
const hashedPassword = await bcrypt.hash(body.password, 5);


let secQuery,secValues=[];
const query=`INSERT INTO alumni_personal (name, regno, email, phno, department, year_of_pass_out, career,password)VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
const values=[body.name, body.regno, body.email,body.phoNo,body.dep, body.year_of_passing, body.next_step, hashedPassword];
    

if (body.next_step==='placed'){
        secQuery=`INSERT INTO alumni_placed ( regno, company,position,salary)VALUES ($1, $2, $3, $4)`;
        secValues=[body.regno,body. placedCompany,body.placedPosition,body.Salary];
}
    else if(body.next_step==='higher'){
        secQuery=`INSERT INTO alumni_studying ( regno, university ,course,specification) VALUES ($1, $2, $3, $4)`;
        secValues=[body.regno,body.Higherclg,body.highercourse,body.Higherspl];
    }
     else if(body.next_step==='other'){
        secQuery=`INSERT INTO alumni_others ( regno,specification,details) VALUES ($1, $2, $3)`;
        secValues=[body.regno,body.othrsp,body.othrdet];
    }
    else{
        res.status(404).json({ msg: 'Invalid Request' });
    }

    try {
        // Insert the data into the PostgreSQL database
        const result = await db.query(query,values);
        const res2= await db.query(secQuery,secValues);
        // console.log(res2.rows[0]);
        res.status(201).json({ msg: 'Alumni registered successfully', id: result.rows[0]});
        } catch (error) {
        console.error(error);
        if(error.detail){
            res.status(500).json({ msg: 'User already exists' });
        }
        res.status(500).json({ msg: 'Server error' });
    }


};

export default {RegisterAlumini};