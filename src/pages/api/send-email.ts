import type { APIRoute } from 'astro';
import axios from 'axios';

// Mark this endpoint as server-rendered
export const prerender = false;

// Get Resend API key from environment variables
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data from the request
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Formato de datos inválido.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const { name, email, subject, phone, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Por favor complete todos los campos requeridos.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Por favor ingrese un correo electrónico válido.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Send email using Resend API with axios
    const emailResponse = await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'ProFiber <website@profiberpr.com>', // Replace with your verified domain
        to: ['profiberprllc@gmail.com'], // Replace with your recipient email
        // to: ['profiberprllc@gmail.com'], // Replace with your recipient email
        reply_to: email, // This allows you to reply directly to the customer
        subject: `Nuevo Contacto: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FD3CFC; border-bottom: 2px solid #FD3CFC; padding-bottom: 10px;">
              Nuevo Mensaje de Contacto
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Correo Electrónico:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
              <p style="margin: 10px 0;"><strong>Asunto:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Mensaje:</strong></p>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>Este mensaje fue enviado desde el formulario de contacto de ProFiber.</p>
            </div>
          </div>
        `,
      },
      {
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const emailData = emailResponse.data;

    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.',
        data: emailData,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-email API:', error);
    
    // Handle axios errors specifically
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Axios/Resend Error:', errorMessage);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error al enviar el correo. Por favor intente nuevamente.',
          details: errorMessage,
        }),
        {
          status: error.response?.status || 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor. Por favor intente nuevamente.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
