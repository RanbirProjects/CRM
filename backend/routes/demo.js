const express = require('express');
const Customer = require('../models/Customer');
const Interaction = require('../models/Interaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Seed demo data
router.post('/seed', auth, async (req, res) => {
  try {
    // Clear existing data for this user
    await Customer.deleteMany({ user: req.user });
    await Interaction.deleteMany({ user: req.user });

    // Demo customers with diverse companies
    const demoCustomers = [
      {
        name: 'John Smith',
        email: 'john.smith@techcorp.com',
        phone: '+1-555-0123',
        company: 'TechCorp Solutions',
        notes: 'Lead developer interested in our enterprise solutions. Very responsive to emails.',
        user: req.user
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@innovateinc.com',
        phone: '+1-555-0456',
        company: 'Innovate Inc',
        notes: 'Marketing director. Looking for CRM integration with their existing tools.',
        user: req.user
      },
      {
        name: 'Michael Chen',
        email: 'mchen@startupxyz.com',
        phone: '+1-555-0789',
        company: 'StartupXYZ',
        notes: 'CEO of a growing startup. Needs scalable solution for team of 15.',
        user: req.user
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@globaltech.com',
        phone: '+1-555-0321',
        company: 'GlobalTech Industries',
        notes: 'VP of Sales. Interested in advanced analytics and reporting features.',
        user: req.user
      },
      {
        name: 'David Wilson',
        email: 'dwilson@consultingpro.com',
        phone: '+1-555-0654',
        company: 'ConsultingPro',
        notes: 'Senior consultant. Needs white-label solution for client management.',
        user: req.user
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@retailplus.com',
        phone: '+1-555-0987',
        company: 'RetailPlus',
        notes: 'Operations Manager. Looking for inventory integration capabilities.',
        user: req.user
      },
      {
        name: 'Robert Taylor',
        email: 'rtaylor@financesolutions.com',
        phone: '+1-555-0124',
        company: 'Finance Solutions',
        notes: 'CFO. Requires compliance and security features for financial data.',
        user: req.user
      },
      {
        name: 'Jennifer Brown',
        email: 'jbrown@healthcareplus.com',
        phone: '+1-555-0457',
        company: 'Healthcare Plus',
        notes: 'IT Director. Needs HIPAA compliance and patient data management.',
        user: req.user
      },
      {
        name: 'Alex Rodriguez',
        email: 'alex.r@digitalmarketing.com',
        phone: '+1-555-0789',
        company: 'Digital Marketing Pro',
        notes: 'Marketing Manager. Looking for lead tracking and automation features.',
        user: req.user
      },
      {
        name: 'Maria Garcia',
        email: 'maria.g@realestate.com',
        phone: '+1-555-0321',
        company: 'Real Estate Partners',
        notes: 'Property Manager. Needs client relationship tracking for property sales.',
        user: req.user
      },
      {
        name: 'James Wilson',
        email: 'james.w@manufacturing.com',
        phone: '+1-555-0654',
        company: 'Manufacturing Co',
        notes: 'Operations Director. Looking for supply chain integration.',
        user: req.user
      },
      {
        name: 'Amanda Lee',
        email: 'amanda.lee@education.com',
        phone: '+1-555-0987',
        company: 'Education First',
        notes: 'School Administrator. Needs student and parent communication tools.',
        user: req.user
      },
      {
        name: 'Chris Thompson',
        email: 'chris.t@logistics.com',
        phone: '+1-555-0123',
        company: 'Logistics Express',
        notes: 'Fleet Manager. Looking for delivery tracking and customer management.',
        user: req.user
      },
      {
        name: 'Rachel Green',
        email: 'rachel.g@restaurant.com',
        phone: '+1-555-0456',
        company: 'Restaurant Chain',
        notes: 'Operations Manager. Needs reservation and customer feedback system.',
        user: req.user
      },
      {
        name: 'Kevin Martinez',
        email: 'kevin.m@construction.com',
        phone: '+1-555-0789',
        company: 'Construction Corp',
        notes: 'Project Manager. Looking for project tracking and client communication.',
        user: req.user
      },
      {
        name: 'Sophie Turner',
        email: 'sophie.t@fashion.com',
        phone: '+1-555-0321',
        company: 'Fashion Forward',
        notes: 'Brand Manager. Needs customer loyalty and inventory management.',
        user: req.user
      },
      {
        name: 'Daniel Kim',
        email: 'daniel.k@automotive.com',
        phone: '+1-555-0654',
        company: 'Automotive Solutions',
        notes: 'Dealership Manager. Looking for customer service and sales tracking.',
        user: req.user
      },
      {
        name: 'Emma White',
        email: 'emma.w@legal.com',
        phone: '+1-555-0987',
        company: 'Legal Associates',
        notes: 'Law Firm Partner. Needs case management and client billing.',
        user: req.user
      },
      {
        name: 'Ryan Johnson',
        email: 'ryan.j@insurance.com',
        phone: '+1-555-0123',
        company: 'Insurance Group',
        notes: 'Claims Manager. Looking for policy management and customer support.',
        user: req.user
      },
      {
        name: 'Nina Patel',
        email: 'nina.p@pharmaceutical.com',
        phone: '+1-555-0456',
        company: 'Pharmaceutical Inc',
        notes: 'Sales Director. Needs compliance tracking and physician relationship management.',
        user: req.user
      }
    ];

    // Insert demo customers
    const savedCustomers = await Customer.insertMany(demoCustomers);

    // Demo interactions for all customers
    const demoInteractions = [
      // TechCorp Solutions interactions
      {
        customer: savedCustomers[0]._id,
        type: 'call',
        note: 'Initial discovery call. John showed strong interest in our enterprise features. Discussed pricing and implementation timeline.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      {
        customer: savedCustomers[0]._id,
        type: 'email',
        note: 'Sent proposal and demo video. John requested additional information about API integration.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Innovate Inc interactions
      {
        customer: savedCustomers[1]._id,
        type: 'meeting',
        note: 'Product demo meeting. Sarah was impressed with the marketing automation features. Scheduled follow-up for next week.',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // StartupXYZ interactions
      {
        customer: savedCustomers[2]._id,
        type: 'call',
        note: 'Quick check-in call. Michael is still evaluating options but likes our pricing model.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // GlobalTech Industries interactions
      {
        customer: savedCustomers[3]._id,
        type: 'email',
        note: 'Sent case studies and ROI analysis. Emily requested technical specifications document.',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // ConsultingPro interactions
      {
        customer: savedCustomers[4]._id,
        type: 'meeting',
        note: 'White-label solution discussion. David needs custom branding options and API documentation.',
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // RetailPlus interactions
      {
        customer: savedCustomers[5]._id,
        type: 'call',
        note: 'Inventory integration demo. Lisa was interested in real-time sync capabilities.',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Finance Solutions interactions
      {
        customer: savedCustomers[6]._id,
        type: 'email',
        note: 'Compliance documentation sent. Robert needs SOC 2 and GDPR compliance details.',
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Healthcare Plus interactions
      {
        customer: savedCustomers[7]._id,
        type: 'meeting',
        note: 'HIPAA compliance discussion. Jennifer needs detailed security protocols and audit trails.',
        date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Digital Marketing Pro interactions
      {
        customer: savedCustomers[8]._id,
        type: 'call',
        note: 'Lead tracking demo. Alex was impressed with automation capabilities.',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Real Estate Partners interactions
      {
        customer: savedCustomers[9]._id,
        type: 'email',
        note: 'Property management features overview. Maria needs client portal for property viewings.',
        date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Manufacturing Co interactions
      {
        customer: savedCustomers[10]._id,
        type: 'meeting',
        note: 'Supply chain integration discussion. James needs vendor management features.',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Education First interactions
      {
        customer: savedCustomers[11]._id,
        type: 'call',
        note: 'Student communication tools demo. Amanda needs parent portal integration.',
        date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Logistics Express interactions
      {
        customer: savedCustomers[12]._id,
        type: 'email',
        note: 'Delivery tracking features sent. Chris needs real-time GPS integration.',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Restaurant Chain interactions
      {
        customer: savedCustomers[13]._id,
        type: 'meeting',
        note: 'Reservation system demo. Rachel needs customer feedback integration.',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Construction Corp interactions
      {
        customer: savedCustomers[14]._id,
        type: 'call',
        note: 'Project tracking overview. Kevin needs client communication tools.',
        date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Fashion Forward interactions
      {
        customer: savedCustomers[15]._id,
        type: 'email',
        note: 'Loyalty program features sent. Sophie needs inventory management integration.',
        date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Automotive Solutions interactions
      {
        customer: savedCustomers[16]._id,
        type: 'meeting',
        note: 'Dealership management demo. Daniel needs customer service tracking.',
        date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Legal Associates interactions
      {
        customer: savedCustomers[17]._id,
        type: 'call',
        note: 'Case management overview. Emma needs client billing integration.',
        date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Insurance Group interactions
      {
        customer: savedCustomers[18]._id,
        type: 'email',
        note: 'Policy management features sent. Ryan needs claims tracking system.',
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        user: req.user
      },
      // Pharmaceutical Inc interactions
      {
        customer: savedCustomers[19]._id,
        type: 'meeting',
        note: 'Compliance tracking demo. Nina needs physician relationship management.',
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        user: req.user
      }
    ];

    // Insert demo interactions
    await Interaction.insertMany(demoInteractions);

    res.json({ 
      msg: 'Demo data seeded successfully',
      customers: savedCustomers.length,
      interactions: demoInteractions.length
    });
  } catch (err) {
    console.error('Error seeding demo data:', err);
    res.status(500).json({ msg: 'Error seeding demo data' });
  }
});

module.exports = router; 