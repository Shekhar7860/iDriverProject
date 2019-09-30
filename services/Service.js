import React, {Component} from 'react';
import {Platform, StyleSheet, AsyncStorage, NetInfo} from 'react-native';
import Constants from '../constants/Constants';
export default class Service  extends Component {
  
  constructor(props){
    super(props);
    this.state = { 
      user :'',
      client : 0,
      isConnected: true
    }
    constants = new Constants();
    
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
    return NetInfo.getConnectionInfo();
  };

  // setClient = (val) => {
  //   console.log('this', this)
  //   this.setState({ client : val});
  // }

  getClient = () => {
    return this.state.client;
  }

saveUserData = async (key, value) => {
  //console.log(key ,value);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

getUserData = async (key) => {
  var data = await AsyncStorage.getItem(key) || 'none';
  return data;
}

clearLocalStorage = async () => {
  try {
  await AsyncStorage.clear();
  } catch (error) {
  }
  }

validateEmail = (email) => {
  // console.log(email);
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
   
    return (true)
  }
    
    return (false)
};

login = (mobile, password) => 
{
  var data = {
    username : mobile,
    password: password,
    service : "authenticateglobal"
   }
 return  fetch(constants.apiUrl,
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.text())
   .catch((error) => {
     console.error(error);
   });
}
logoutApi = (ApiToken, deviceToken) => 
{
  var data = {
    api_token : ApiToken,
    device_token : deviceToken
   }
   console.log(JSON.stringify(data));
   return  fetch(constants.apiUrl + '/update/device/token',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

loginOtp = (mobile, type, deviceToken, deviceId) => 
{
  var data = {
    mobile: mobile,
    device_token : deviceToken,
    device_type : type,
    device_id : deviceId
   }
   console.log(JSON.stringify(data));
   return  fetch(constants.apiUrl + '/user/send-otp',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.log('errpr', error);
   });
}

dopayment = (clientToken, freeLancerToken, jobId, milestoneId, payment) => 
{
  var data = {
    "client_token": clientToken,
    "freelancer_token":  freeLancerToken,
    "job_id": jobId,
    "milestone_id": milestoneId,
    "payment":  payment
    }
console.log(data)
 // alert(constants.apiUrl + '/client/post/payment')
   return  fetch('https://www.zaraf.org/freelancerWeb/api/client/post/payment',
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
       },
    
     body: JSON.stringify(data)
   }).then((response) => 
   response)
   .catch((error) => {
     console.error(error);
   });
}

verifyPayment = (pId) => 
{
  var data = {
    "payment_reference" : pId
}
console.log(data)
 // alert(constants.apiUrl + '/client/post/payment')
   return  fetch('https://www.zaraf.org/freelancerWeb/api/client/verify/payment',
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
       },
    
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}


resendOtp = (mobile) => 
{
  var data = {
    mobile: mobile
   }
   console.log(data);
   return  fetch(constants.apiUrl + '/user/resend-otp',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

verifyOtp = (mobile, otp, type) => 
{
  var data = {
    mobile: mobile,
    otp   : otp,
    usertype : type
   }
  console.log(data)
 return  fetch(constants.apiUrl + '/user/verifiedOTP',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getNotificationStatus = (token) => 
{
  console.log(constants.apiUrl + `/sound-get?api_token=${token}`)
 return fetch(constants.apiUrl + `/sound-get?api_token=${token}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getFeedList = (token) => 
{
  console.log(constants.apiUrl + `/user/recommneded/active-jobs?&api_token=${token}`)
 return fetch(constants.apiUrl + `/user/recommneded/active-jobs?&api_token=${token}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}
findFreelancer = (token, category) => 
{
 //  console.log('url', constants.apiUrl + `/find-freelancer?&api_token=${token}&category_id=${category}`)
 console.log('token', token, category, 'category')
 return  fetch(constants.apiUrl + `/find-freelancer?&api_token=${token}&category_id=${category}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getNotifications = (id) => {
  return  fetch(constants.apiUrl + `/show/push/notification?user_id=${id}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getFreelancerDetails = (token, id) => {
  return  fetch(constants.apiUrl + `/jobs-details?&api_token=${token}&job_id=${id}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

jobs = (token) => 
{
 return fetch(constants.apiUrl + `/user/jobs?&api_token=${token}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

addFav = (token,jobId,isFav) => 
{
  var data = {
    api_token: token,
    job_id : jobId,
    isFavourite : isFav
   }
  console.log(data)
 return  fetch(constants.apiUrl + '/is-favourite',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getFavJobList = (token) => 
{
  console.log(token)
 return  fetch(constants.apiUrl + `/user/recommneded/favourite/Job?&api_token=${token}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

updateImage = (api_token,imageUri) =>{

  var photo = {
    uri: imageUri,
    type: 'multipart/form-data',
    name: 'photo.jpg',
  };


  var body = new FormData();

  body.append('api_token', api_token);
  body.append('image_file', photo);


return fetch(constants.apiUrl + '/user/update/profile-picture',
{
method: "POST",
headers: {
'Content-Type': 'multipart/form-data'
},
body: body
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});

}

profile_update = (api_token,username,email,about_me, imageUri, category, file, ID, user, skills) => 
{
  console.log(skills)
  console.log("id", ID + "file", file)
  console.log("this is file",  file)

console.log(file);
if(file.fileName != undefined)
{
  console.log('FILE')
  var fileUploaded = {
    name: file.fileName,
    uri: file.uri,
    type: file.type
  }
}
else
{
  var fileUploaded = {
    name: 'doc.jpg',
    uri: file,
   type: 'multipart/form-data'
  }
}

if(ID.fileName != undefined)
{
  console.log('ID')
     var proof = {
      name: ID.fileName,
      uri: ID.uri,
     type: ID.type
    }
}
else
{
  var proof = {
    name: 'photo.jpg',
    uri: ID,
   type: 'multipart/form-data'
  }
}







var body = new FormData();
console.log("type", user)
if(user === "client")
{
  console.log(user)
body.append('api_token', api_token);
body.append('user_name',  username);
body.append('email', email);
body.append('about_me', about_me);
//body.append('image_file', photo);
body.append('isLogin', 1);
}
else
{
  body.append('api_token', api_token);
  body.append('user_name',  username);
  body.append('email', email);
  body.append('about_me', about_me);
  body.append('CV_file', fileUploaded);
  body.append('identity_Id', proof);
  body.append('categoryId', category);
  //body.append('image_file', photo);
  body.append('skills', skills);
  body.append('isLogin', 1);
}
console.log("res", body)

return fetch(constants.apiUrl + '/user/update/profile',
{
method: "POST",
headers: {
'Content-Type': 'multipart/form-data'
},
body: body
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

sendProposal= (api_token, freelancerId, jobId) => 
{
var data = {
api_token: api_token,
freelancer_id: freelancerId ,
job_id: jobId

}
console.log(data);
return fetch(constants.apiUrl + '/client/sendJobRequest',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

post_project = (api_token,title,description,country,category,job_type,budget,start_date,end_date, skills) => 
{
  console.log(country);
var data = {
"api_token":api_token ,
"title": title,
"description": description,
"country": country,
"category": category,
"job_type": job_type,
"budget": budget,
"start_date": start_date,
"end_date":end_date,
"skills_name": skills,
"publics":1
}
console.log(data)
// console.log(constants.apiUrl + '/submit-job')
return fetch(constants.apiUrl + '/submit-job',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

requestResponseClient = (api_token, requestStatus, jobId, freelancerId) => 
{
var data = {
"api_token":api_token ,
"request_status" :requestStatus,
"job_id" : jobId,
"freelancer_id" : freelancerId

}
console.log(data)
console.log(constants.apiUrl + '/user/accept/jobs')
return fetch(constants.apiUrl + '/user/hired/freelancer',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

requestResponse = (api_token, requestStatus, jobId) => 
{
var data = {
"api_token":api_token ,
"request_status" :requestStatus,
"job_id" : jobId

}
console.log(data)
console.log(constants.apiUrl + '/user/accept/jobs')
return fetch(constants.apiUrl + '/user/accept/jobs',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}


category = () => 
{
return fetch(constants.apiUrl + `/categories`,
{
method: "GET"
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

cities = () => 
{
return fetch(constants.apiUrl + `/city-lists`,
{
method: "GET"
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}


create_milestone = (api_token,project_id, amount, end_date,description) => 
{
var data = {
api_token: api_token,
jobid : project_id,
amount : amount,
end_date : end_date,
description : description,
}
console.log(data)
return fetch(constants.apiUrl + '/create-milestone',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

createProject = (apiToken,jobId, freelancerId, amount , description) => 
{
var data = {
api_token: apiToken,
job_id : jobId ,
freelancer_id : freelancerId,
amount : amount,
description : description,
}
console.log(data)
return fetch(constants.apiUrl + '/create-project',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

getMilestoneList = (token, id) => 
{
  console.log('token', token, 'id', id)
 return  fetch(constants.apiUrl + `/view-milestone?&api_token=${token}&jobid=${id}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getprojectList = (token, id) => 
{
 return  fetch(constants.apiUrl + `/view-project?&api_token=${token}&job_id=${id}`,
    {
      method: "GET"
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}



feebback = (token, feedbck) => 
{
  var data = {
    api_token: token,
    feedback: feedbck
   }
   console.log(data)
 return  fetch(constants.apiUrl + '/submit-feedback',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }).then((response) => 
   response.json())
   .catch((error) => {
     console.error(error);
   });
}

getUserProfileData= (token) => 
{
 
   console.log(constants.apiUrl + `/all-users-data?&api_token=${token}`)
   return  fetch(constants.apiUrl + `/all-users-data?&api_token=${token}`,
   {
     method: "GET"
  }).then((response) => 
  response.json())
  .catch((error) => {
    console.error(error);
  });
}

ratingAction = (clientToken,freelancerToken,projectID,review,ratingVal) => 
{
var data = {
client_token: clientToken,
freelancer_token: freelancerToken,
jobid: projectID,
review: review,
ratings: ratingVal
}
console.log(data)
return fetch(constants.apiUrl + '/ratings-freelancer',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

messagesPush = (userId, message,senderuserId) =>
{
var data = {
receiver_id:userId,
sender_id: senderuserId,
message : message
}
console.log(data)
return fetch(constants.apiUrl + '/user-notification',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}
 
updateNotificationSound = (token, soundValue) =>
{
var data = {
api_token: token, 
sound : soundValue
}
console.log(data)
return fetch(constants.apiUrl + '/sound-update',
{
method: "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(data)
}).then((response) => 
response.json())
.catch((error) => {
console.error(error);
});
}

completeMilestone = (token, milestoneId, status) => {
  var data = {
    api_token: token, 
    milestone_id : milestoneId,
    status : status
    }
    console.log(data)
    return fetch(constants.apiUrl + '/status-milestone',
    {
    method: "POST",
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    }).then((response) => 
    response.json())
    .catch((error) => {
    console.error(error);
    });
}
  
}