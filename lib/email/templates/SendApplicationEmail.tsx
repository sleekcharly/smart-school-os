// import {
//   Body,
//   Column,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Img,
//   Preview,
//   Row,
//   Section,
//   Tailwind,
//   Text,
// } from 'react-email';
// import { barebonesBoxedTailwindConfig } from '../theme';
// import { BarebonesFonts } from '../theme-fonts';
// import { ApplicationEmailProps } from '@/utils/types';

// export const SchoolApplicationEmail = ({
//   adminName,
//   schoolName,
// }: ApplicationEmailProps) => (
//   <Tailwind config={barebonesBoxedTailwindConfig}>
//     <Html>
//       <Head>
//         <BarebonesFonts />
//       </Head>

//       <Body className="bg-bg-2 m-0 text-center font-sans">
//         <Preview>
//           Welcome to Rektora -- Your school application is under review
//         </Preview>
//         {/* HEADER */}
//         <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-160">
//           <Section>
//             <Section className="bg-bg mobile:px-2 px-6 py-4">
//               <Section className="mb-3 px-6">
//                 <Row>
//                   <Column className="w-1/2 py-1.75 align-middle">
//                     <Row>
//                       <Column className="w-8 align-middle">
//                         <Img
//                           src={`https://firebasestorage.googleapis.com/v0/b/rektora-live.firebasestorage.app/o/app%2Flogo%2Ficon_only.png?alt=media&token=59575176-554a-40e8-bd6d-3dd78b1cb8da`}
//                           alt="Rektora Logo"
//                           width={32}
//                           className="block"
//                         />
//                       </Column>
//                     </Row>
//                   </Column>
//                   <Column align="right" className="w-1/2 py-1.75 align-middle">
//                     <Text className="font-13 m-0 text-right font-sans">
//                       <span className="text-fg-3">{schoolName}</span>
//                     </Text>
//                   </Column>
//                 </Row>
//               </Section>

//               <Section className="bg-bg-2 mobile:px-6 mobile:py-12 rounded-[8px] px-10 py-16 text-center mb-3">
//                 <Section className="mb-3">
//                   <Img
//                     src={`https://firebasestorage.googleapis.com/v0/b/rektora-live.firebasestorage.app/o/app%2Flogo%2Ficon_only.png?alt=media&token=59575176-554a-40e8-bd6d-3dd78b1cb8da`}
//                     alt="Rektora Logo"
//                     width={48}
//                     className="mx-auto mb-5 block"
//                   />
//                   <Heading as="h1" className="font-28 text-fg m-0 font-sans">
//                     Welcome to Rektora <br />
//                     <span className="text-fg-3">
//                       We&apos;re excited to have you on board!
//                     </span>
//                   </Heading>

//                   <Text className="font-16 text-fg-2 mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
//                     Thank you for signing up.
//                     <br />
//                     Your school application has been successfully submitted.
//                   </Text>
//                 </Section>
//               </Section>

//               <Section className="px-6">
//                 <Row>
//                   <Column style={{ padding: '10px 40px 0px' }}>
//                     <Section
//                       style={{
//                         background:
//                           'linear-gradient(135deg, #16a34a 0%, #10b981 100%); border-radius:24px;padding:32px;text-align:center',
//                       }}
//                     >
//                       <Text className="m-0 text-[14px] tracking-wide uppercase font-bold text-[rgba(255,255,255,0.85)">
//                         ONBOARDING IN PROGRESS
//                       </Text>

//                       <Heading
//                         as="h2"
//                         className="mx-auto my-3.5 text-[28px] leading-[1.8rem] text-[rgba(255,255,255,0.9) max-w-110"
//                       >
//                         Our onboarding team is currently reviewing your
//                         application and preparing your school workspace.
//                       </Heading>
//                     </Section>
//                   </Column>
//                 </Row>

//                 <Row>
//                   <Column style={{ padding: '40px' }}>
//                     <Text className="mt-0 mr-0 mb-4.5 text-base leading-[1.8rem] text-[#d7e1ef]">
//                       Hi <strong>{adminName}</strong>
//                     </Text>
//                     <Text className="mt-0 mr-0 mb-4.5 text-[15px] leading-[1.9rem] text-[#b8c4d6]">
//                       Thank you for choosing Rektora for{' '}
//                       <strong>{schoolName}</strong>
//                     </Text>
//                     <Text className="mt-0 mr-0 mb-4.5 text-[15px] leading-[1.9rem] text-[#b8c4d6]">
//                       We&apos;ve received your onboarding request successfully
//                       and our team is currently reviewing your application.
//                     </Text>

//                     <Section className="width-full p-6 mx-7 bg-[#101d33] rounded-[20px]">
//                       <Row>
//                         <Column>
//                           <Heading
//                             as="h3"
//                             className="mt-0 mr-0 mb-3 text-base text-[#ffffff]"
//                           >
//                             What happens next?
//                           </Heading>
//                           <Text className="mt-o mr-0 mb-3 text-sm leading-[1.7rem] text-[#c7d3e3]">
//                             ✅ Your application will be reviewed by our
//                             onboarding team
//                           </Text>
//                           <Text className="mt-o mr-0 mb-3 text-sm leading-[1.7rem] text-[#c7d3e3]">
//                             ✅ Your school portal will be prepared and
//                             configured
//                           </Text>
//                           <Text className="mt-o mr-0 mb-3 text-sm leading-[1.7rem] text-[#c7d3e3]">
//                             ✅ Temporary login credentials will be sent to this
//                             email
//                           </Text>
//                           <Text className="mt-o mr-0 mb-3 text-sm leading-[1.7rem] text-[#c7d3e3]">
//                             ✅ You&apos;ll be guided through your first login
//                             and setup
//                           </Text>
//                         </Column>
//                       </Row>
//                     </Section>

//                     {/* ETA */}
//                     <Section className="mt-6 p-5 rounded-[18px] bg-[rgba(34,194,94,0.08)] border border-[rgba(34,197,94,0.15)]">
//                       <Text className="m-0 text-sm leading-[1.8rem] text-[#d7e1ef]">
//                         ⏱️ Most school applications are activated within{' '}
//                         <strong>24 hours</strong>.
//                       </Text>
//                     </Section>

//                     {/* SUPPORT */}
//                     <Text className="mt-7 mr-0 mb-0 text-sm leading-[1.9rem] text-[#9fb0c8]">
//                       If you have any questions, simply reply to this email and
//                       our support team will assist you.
//                     </Text>
//                   </Column>
//                 </Row>

//                 {/* Footer */}
//                 <Row>
//                   <Column
//                     align="center"
//                     className="px-7 py-10 border-t-[rgba(255,255,255,0.06);"
//                   >
//                     <Text className="m-0 text-sm text-[#7d8ca3]">
//                       Rektora • School Management Platform
//                     </Text>

//                     <Text className="mt-2.5 mr-0 mb-0 text-sm text-[#5d6b82]">
//                       Simplifying school operations across Africa
//                     </Text>
//                   </Column>
//                 </Row>
//               </Section>
//             </Section>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   </Tailwind>
// );

// export default SchoolApplicationEmail;

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';

import { barebonesBoxedTailwindConfig } from '../theme';
import { BarebonesFonts } from '../theme-fonts';

interface SchoolApplicationEmailProps {
  adminName: string;
  schoolName: string;
  plan: string;
  websiteUrl: string;
  dashboardPreviewUrl: string;
}

export const SchoolApplicationEmail = ({
  adminName,
  schoolName,
  plan,
  websiteUrl,
  dashboardPreviewUrl,
}: SchoolApplicationEmailProps) => {
  return (
    <Tailwind config={barebonesBoxedTailwindConfig}>
      <Html>
        <Head>
          <BarebonesFonts />
        </Head>

        <Preview>
          Welcome to Rektora. Your school is about to get a whole lot easier to
          manage.
        </Preview>

        <Body
          style={{
            backgroundColor: '#08111f',
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            margin: 0,
            padding: '40px 0',
          }}
        >
          <Container
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              backgroundColor: '#0d1729',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* HEADER */}

            <Section
              style={{
                padding: '32px',
              }}
            >
              <Row>
                <Column>
                  <Img
                    src="https://firebasestorage.googleapis.com/v0/b/rektora-live.firebasestorage.app/o/app%2Flogo%2Ficon_only.png?alt=media"
                    width={48}
                    alt="Rektora"
                  />
                </Column>

                <Column align="right">
                  <Text
                    style={{
                      color: '#94a3b8',
                      fontSize: '15px',
                    }}
                  >
                    {schoolName}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* HERO */}

            <Section
              style={{
                padding: '0 40px 40px',
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: '#22c55e',
                  fontSize: '14px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                APPLICATION RECEIVED
              </Text>

              <Heading
                style={{
                  color: '#ffffff',
                  fontSize: '40px',
                  lineHeight: '48px',
                  fontWeight: 800,
                  margin: '12px 0 20px',
                }}
              >
                Your school is about to get a whole lot easier to manage.
              </Heading>

              <Text
                style={{
                  color: '#cbd5e1',
                  fontSize: '18px',
                  lineHeight: '32px',
                  marginBottom: '12px',
                }}
              >
                We&apos;ve successfully received your application and are
                preparing your Rektora workspace.
              </Text>

              <Text
                style={{
                  color: '#94a3b8',
                  fontSize: '16px',
                  lineHeight: '28px',
                  marginBottom: '32px',
                }}
              >
                The next email you receive could change how your school operates
                every day.
              </Text>

              <Button
                href={websiteUrl}
                style={{
                  background: 'linear-gradient(135deg,#16a34a 0%,#10b981 100%)',
                  color: '#ffffff',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                Explore Rektora
              </Button>
            </Section>

            {/* DASHBOARD PREVIEW */}

            <Section
              style={{
                padding: '0 32px 40px',
              }}
            >
              <Img
                src={dashboardPreviewUrl}
                alt="Rektora Dashboard Preview"
                width={576}
                style={{
                  borderRadius: '18px',
                }}
              />

              <Text
                style={{
                  textAlign: 'center',
                  color: '#94a3b8',
                  marginTop: '16px',
                  fontSize: '13px',
                }}
              >
                A preview of your future school command center.
              </Text>
            </Section>

            {/* ACTIVATION CARD */}

            <Section
              style={{
                margin: '0 32px 32px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg,#16a34a 0%,#10b981 100%)',
                padding: '32px',
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: '#ffffff',
                  opacity: 0.9,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                }}
              >
                Activation Target
              </Text>

              <Text
                style={{
                  color: '#ffffff',
                  fontSize: '52px',
                  lineHeight: '52px',
                  fontWeight: 800,
                  margin: '0 0 12px',
                }}
              >
                24h
              </Text>

              <Text
                style={{
                  color: '#ffffff',
                  opacity: 0.95,
                  margin: 0,
                }}
              >
                Most schools are activated within one business day.
              </Text>
            </Section>

            {/* TIMELINE */}

            <Section
              style={{
                backgroundColor: '#101d33',
                borderRadius: '20px',
                margin: '0 32px 32px',
                padding: '28px',
              }}
            >
              <Heading
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  marginTop: 0,
                }}
              >
                Your onboarding journey
              </Heading>

              <Text style={{ color: '#22c55e' }}>✅ Application Submitted</Text>

              <Text style={{ color: '#f59e0b' }}>⏳ Review In Progress</Text>

              <Text style={{ color: '#94a3b8' }}>○ Portal Preparation</Text>

              <Text style={{ color: '#94a3b8' }}>○ Account Activation</Text>
            </Section>

            {/* PERSONAL MESSAGE */}

            <Section
              style={{
                padding: '0 40px',
              }}
            >
              <Text
                style={{
                  color: '#ffffff',
                  lineHeight: '30px',
                }}
              >
                Hi <strong>{adminName}</strong>,
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                Thank you for choosing Rektora for <strong>{schoolName}</strong>
                .
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                You&apos;ve taken an important step toward simplifying the daily
                operations of your school.
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                From student records and attendance tracking to report cards,
                billing, communication and administration, Rektora is designed
                to help schools spend less time on paperwork and more time on
                education.
              </Text>
            </Section>

            {/* PLAN */}

            <Section
              style={{
                margin: '32px',
                padding: '24px',
                backgroundColor: '#0f1f36',
                borderRadius: '18px',
              }}
            >
              <Text
                style={{
                  color: '#22c55e',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                Selected Plan
              </Text>

              <Heading
                style={{
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                {plan}
              </Heading>

              <Text
                style={{
                  color: '#94a3b8',
                }}
              >
                Your onboarding process is being tailored for this plan.
              </Text>
            </Section>

            {/* FEATURES */}

            <Section
              style={{
                padding: '0 32px',
              }}
            >
              <Heading
                style={{
                  color: '#ffffff',
                  fontSize: '24px',
                }}
              >
                What you&apos;ll unlock
              </Heading>

              {[
                {
                  icon: '📚',
                  title: 'Student Records',
                  desc: 'Manage admissions, records and class placements.',
                },
                {
                  icon: '👨‍🏫',
                  title: 'Staff Management',
                  desc: 'Organize teachers, permissions and responsibilities.',
                },
                {
                  icon: '📊',
                  title: 'Results & Report Cards',
                  desc: 'Generate professional report cards in minutes.',
                },
                {
                  icon: '💳',
                  title: 'School Billing',
                  desc: 'Track fees and outstanding balances.',
                },
                {
                  icon: '📱',
                  title: 'Parent Communication',
                  desc: 'Keep parents informed from a single platform.',
                },
              ].map((feature) => (
                <Section
                  key={feature.title}
                  style={{
                    backgroundColor: '#101d33',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '12px',
                  }}
                >
                  <Text
                    style={{
                      color: '#ffffff',
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}
                  >
                    {feature.icon} {feature.title}
                  </Text>

                  <Text
                    style={{
                      color: '#94a3b8',
                      margin: 0,
                    }}
                  >
                    {feature.desc}
                  </Text>
                </Section>
              ))}
            </Section>

            {/* NEXT EMAIL */}

            <Section
              style={{
                margin: '32px',
                padding: '28px',
                borderRadius: '18px',
                border: '1px solid rgba(34,197,94,0.15)',
                backgroundColor: 'rgba(34,197,94,0.05)',
              }}
            >
              <Heading
                style={{
                  color: '#ffffff',
                  marginTop: 0,
                }}
              >
                What happens next?
              </Heading>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                Within the next 24 hours you&apos;ll receive another email
                containing:
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '32px',
                }}
              >
                • Your school portal URL
                <br />
                • Administrator login credentials
                <br />
                • First login instructions
                <br />• Quick-start onboarding guide
              </Text>
            </Section>

            {/* FOUNDER NOTE */}

            <Section
              style={{
                margin: '0 32px 32px',
                padding: '28px',
                backgroundColor: '#101d33',
                borderRadius: '20px',
              }}
            >
              <Text
                style={{
                  color: '#22c55e',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                From The Founder
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                Thank you for trusting Rektora with your school&apos;s
                operations.
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                We believe school leaders should focus on education, not
                paperwork.
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  lineHeight: '30px',
                }}
              >
                That&apos;s why we&apos;re building a platform designed
                specifically for modern schools.
              </Text>

              <Text
                style={{
                  color: '#ffffff',
                  marginTop: '24px',
                }}
              >
                Charles Ukasoanya
                <br />
                Founder & CEO
              </Text>
            </Section>

            {/* SUPPORT */}

            <Section
              style={{
                margin: '0 32px 32px',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid #20334f',
              }}
            >
              <Heading
                style={{
                  color: '#ffffff',
                  marginTop: 0,
                }}
              >
                Need help?
              </Heading>

              <Text
                style={{
                  color: '#94a3b8',
                  lineHeight: '28px',
                }}
              >
                Our onboarding team is available if you have questions before
                activation.
              </Text>

              <Text style={{ color: '#ffffff' }}>
                📧 onboarding@rektora.com
              </Text>

              <Text style={{ color: '#ffffff' }}>🌐 {websiteUrl}</Text>
            </Section>

            {/* FOOTER */}

            <Section
              style={{
                padding: '32px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: '#94a3b8',
                  marginBottom: '8px',
                }}
              >
                Rektora • School Management Platform
              </Text>

              <Text
                style={{
                  color: '#64748b',
                  margin: 0,
                }}
              >
                The modern operating system for schools.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default SchoolApplicationEmail;
