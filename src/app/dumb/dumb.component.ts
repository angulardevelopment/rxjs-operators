import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import * as Rx from 'rxjs';
import { of, map, fromEvent } from 'rxjs';
    import { z } from 'zod';
import { Dumb1Component } from './dumb1/dumb1.component';
import { Fixture } from 'zod-fixture';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Dumb1Component],
})
export class DumbComponent implements OnInit {
  constructor() {}

   ngOnInit(){
const UserSchema = z.object({
  username: z.string().min(3),
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
});

// ✅ Successful
const user = UserSchema.parse({
  username: "johndoe",
  age: 30,
  email: "john@example.com",
});

// ❌ Throws error
// const untrustedData = UserSchema.parse({ username: "jo", age: -1 });

const result = UserSchema.safeParse(user);

if (result.success) {
  console.log(result.data); // Validated data
} else {
  console.log(result.error.format()); // Error details
}

type User = z.infer<typeof UserSchema>;
// { username: string; age: number; email: string; isActive: boolean }

  }

  demo(){
    const UserSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  age: z.number().optional(),
});

// Type inference in action
const validUserData = { 
    username: 'johnsmith', 
    email: 'john@example.com', 
    password: 'strongpassword123' 
};

const myUser = UserSchema.parse(validUserData); 
const userInput = { username: 'jane', email: 'not-an-email' };

// parse will throw an error 
try { 
  UserSchema.parse(userInput);
} catch (error) {
    console.error("Validation failed:", error);
} 
// safeParse returns a result
const result = UserSchema.safeParse(userInput);
if (!result.success) {
    console.error("Validation failed:", result.error);
}



type User = z.infer<typeof UserSchema>;
// const UserSchema = z.object({
//   username: z.string().min(5, 'Username must be at least 5 characters')
//               .transform(username => username.trim().toLowerCase()), // Transformation
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must contain at least 8 characters'),
//   zipCode: z.string().refine(
//       (value) => value.length === 5 && /^\d{5}$/.test(value),
//       'Invalid zip code format'
//   ) // Refinement
// });
// Usage
const untidyInput = {
  username: '  Alice75  ',
  email: 'alice@Example.com', // Incorrect casing
  password: 'verystrongpassword', 
  zipCode: '12345'
};

const parsedUser = UserSchema.parse(untidyInput);

console.log(parsedUser); 
// Output: 
// { username: 'alice75', 
//   email: 'alice@example.com', 
//   password: 'verystrongpassword',
//   zipCode: '12345' 
// }

// Form Validation
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// const UserSchema = z.object({
//  name: z.string().min(2, "Name must be at least 2 characters"),
//  email: z.string().email("Invalid email address"),
//  age: z.number().min(18, "You must be at least 18 years old"),
// });

// const { register, handleSubmit, formState: { errors } } = useForm({
//  resolver: zodResolver(UserSchema),
// });

//  API Response Validation
const BookSchema = z.object({
 id: z.number(),
 author: z.string(),
});

async function fetchUser() {
 const response = await fetch("https://api.example.com/book/28292827");
 const data = await response.json();
 const parsedData = BookSchema.parse(data);
 return parsedData;
}

// Data Modeling for Distributed Codebases
const BlogMetadata = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  modified: z.string().datetime(),
});

//  Mock Data for Testing
const PersonSchema = z.object({
  name: z.string(),
  birthday: z.date(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
  }),
  pets: z.array(z.object({ name: z.string(), breed: z.string() })),
  totalVisits: z.number().int(),
});

const fixture = new Fixture();
const person = fixture.fromSchema(PersonSchema);

console.log(person);
// {
//   name: 'barmftzlcngaynw',
//   birthday: 2089-04-19T20:26:28.411Z,
//   address: {
//     street: 'wyttcnyvxpetrsa',
//     city: 'd-iveauywljfifd',
//     state: 'cetuqnbvmbkqwlt'
//   },
//   pets: [
//     { name: 'bonzm-sjnglvkbb', breed: 'fbmiabahyvsy-vm' },
//     { name: 'wqbjuehl-trb-ai', breed: 'vifsztjznktjkve' },
//     { name: 'brrvbrgzmjhttzh', breed: 'cq-jcmhccaduqmk' }
//   ],
//   totalVisits: 24
// }

//  Data Transformation
const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  labels: z.array(z.string()).transform((labels) => new Set(labels)),
});

const blogData = BlogSchema.parse({
  id: 1,
  title: 'Hello World',
  author: 'John Doe',
  labels: ['foo', 'bar', 'foo'],
});

console.log(blogData);

// {
//   id: 1,
//   title: 'Hello World',
//   author: 'John Doe',
//   labels: Set(2) { 'foo', 'bar' }
// }
// Command-Line Argument Parsing
const argsSchema = z.object({
 port: z.string().regex(/^\d+$/, "Port must be a number").transform(Number),
 mode: z.enum(["development", "production"]),
});

const rawArgs = { port: "3000", mode: "development" };

const parsedArgs = argsSchema.parse(rawArgs);
  }


}
// Enforcing Structured Outputs from LLMs
export const blogContentSchema = z.object({
  seoDescription: z
    .string()
    .describe(
      'The SEO-optimized description of the blog post (150-160 characters).'
    ),
  seoTitle: z.string().describe('The SEO-optimized title of the blog post.'),
  keywords: z
    .array(z.string().describe('A keyword or category for the blog.'))
    .describe('An array of keywords or categories for the blog.'),
  content: z
    .string()
    .describe('The main content of the blog in markdown format.'),
});

// {
//   "seoDescription":"Explore use cases of Zod schemas" 
//   "seoTitle":"Advanced Zod Schema Use Cases in TypeScript",
//   "keywords":["Zod schema","TypeScript","data validation","schema validation"],
//   "content":"# Zod Schema Use Cases..."
// }

// const llm = new ChatOpenAI();

// const structuredLLM = llm.withStructuredOutput(blogContentSchema);