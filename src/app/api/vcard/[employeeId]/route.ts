import { NextResponse } from 'next/server';
import vCardsJS from 'vcards-js';
import { mockBusinessCards } from '@/data/mockBusinessCards';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  try {
    const { employeeId } = await params;
    
    // In a real app, this would fetch from a database or CMS
    const employeeData = mockBusinessCards[employeeId];

    if (!employeeData) {
      return new NextResponse('Employee not found', { status: 404 });
    }

    // Create a new vCard
    const vCard = vCardsJS();

    // Set properties
    vCard.firstName = employeeData.firstName;
    vCard.lastName = employeeData.lastName;
    vCard.title = employeeData.title;
    if (employeeData.department) vCard.role = employeeData.department;
    vCard.email = employeeData.email;
    vCard.cellPhone = employeeData.phoneMobile;
    if (employeeData.phoneOffice) vCard.workPhone = employeeData.phoneOffice;
    if (employeeData.linkedInUrl) vCard.socialUrls['linkedIn'] = employeeData.linkedInUrl;
    vCard.organization = employeeData.companyName;
    vCard.url = employeeData.companyWebsite;

    // Get as formatted string
    const vCardString = vCard.getFormattedString();

    // Return the vCard with appropriate headers for downloading
    return new NextResponse(vCardString, {
      headers: {
        'Content-Type': 'text/vcard',
        'Content-Disposition': `attachment; filename="contact-${employeeData.firstName}-${employeeData.lastName}.vcf"`,
      },
    });
  } catch (error) {
    console.error('Error generating vCard:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
