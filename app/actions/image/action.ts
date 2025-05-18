"use server"; 
import { auth, clerkClient } from "@clerk/nextjs/server"; 
import { UploadedFileData } from "uploadthing/types"; 
interface Images { 
  imageLink: string; 
  imageName: string; 
} 
const URL = `${process.env.NEXT_PUBLIC_API_URL}/images`; 
 
const CreateImages = async (images: Partial<UploadedFileData>[]) => { 
  const newImages: Images[] = images.map((image) => { 
    return { 
      imageLink: image.ufsUrl || "", 
      imageName: image.name || "", 
    }; 
  });  
  const { userId, sessionId } = await auth(); 
  if (!userId) throw new Error("User not found"); 
  const client = await clerkClient(); 
  const token = await client.sessions.getToken(sessionId, "usertemp"); 
  console.log(JSON.stringify(newImages)); 
 
  try { 
    const response = await fetch(URL, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token.jwt}`, 
      },  
      body: JSON.stringify(newImages),  
    }); 
 
    // Check if response is OK before parsing JSON 
    if (!response.ok) { 
      throw new Error(`HTTP error! Status: ${response.status}`); 
    } 
    // Check if response is empty
    const text = await response.text(); 
    if (!text) { 
      return { success: true, data: null }; 
    } 
 
    try { 
      return JSON.parse(text); 
    } catch (parseError) { 
      console.error("Failed to parse JSON response:", parseError); 
      return { success: true, data: text }; 
    } 
  } catch (error) { 
    console.error("Error creating images:", error); 
    throw error; 
  } 
};  
 
const DeleteImage = async (imageLink: string) => { 
  const { userId, sessionId } = await auth(); 
  if (!userId) throw new Error("User not found"); 
  const client = await clerkClient(); 
  const token = await client.sessions.getToken(sessionId, "usertemp"); 
  console.log(`Deleting image: ${imageLink}`); 
 
  try { 
    const response = await fetch(`${URL}/${imageLink}`, { 
      method: "DELETE", 
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token.jwt}`, 
      }, 
    }); 
 
    if (response.status === 204) { 
      console.log("Image deleted successfully"); 
      return { success: true }; 
    } 
  } catch (error) { 
    throw error ;
  } 
} ;
export { CreateImages, DeleteImage };