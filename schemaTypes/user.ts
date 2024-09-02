import { defineField } from "sanity";

const user = {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Check if the user is admin",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      // readOnly: true
      // hidden: true
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the user",
      readOnly: true,
      validation: (Rule) => Rule.required(),

    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email of the user",
      
    }),
    defineField({
      name: "emailverified",
      type: "datetime",
      hidden: false,
    }),
    
    defineField({
        name: "image",
        title:"Image",
        type:"url" 
        
    }),
    defineField({
        name:"password",
        type:"string",
        hidden: true,
    }),
    defineField({
        name:"about",
        title:"About",
        type:"text",
        description:"Tell us about yourself",
    })
  ],
};

export default user;
