import PDFComponent from "@/components/pdf";
import TableComponent from "@/components/table";

export default function PDFPage() {
  return <PDFComponent></PDFComponent>;
}

// principalTable: {
//   columns: [
//     {
//       id: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//       name: "Barra 1",
//     },
//     {
//       id: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//       name: "Barra 2",
//     },
//     {
//       id: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//       name: "Ticket 1",
//     },
//     {
//       id: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//       name: "Ticket 2",
//     },
//   ],
//   rows: [
//     {
//       label: "Retiro n°1",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementId: "99c09831-3209-44b6-a30b-17b0ad62a115",
//           type: "RegisterBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementId: "91c386f6-2054-46a6-b56e-ebf2333384ae",
//           type: "RegisterBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementId: "69814315-95a0-4e45-bf52-5389c290229b",
//           type: "RegisterTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementId: "b4ea6102-7d4d-4472-bdc3-d3a2a49a0aeb",
//           type: "RegisterTicket",
//         },
//       },
//       "Barra 1": 885,
//       "Barra 2": 506,
//       "Ticket 1": 324,
//       "Ticket 2": 891,
//     },
//     {
//       label: "Retiro n°2",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementId: "76f605e4-0954-4d1a-8187-4d3d1408a085",
//           type: "RegisterBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementId: "7e8967d4-9040-4cdd-bbf9-96564c837de6",
//           type: "RegisterBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementId: "f5d9595a-875f-437c-9441-275d280b0a00",
//           type: "RegisterTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//       },
//       "Barra 1": 587,
//       "Barra 2": 166,
//       "Ticket 1": 641,
//       "Ticket 2": null,
//     },
//     {
//       label: "Retiro n°3",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementId: "79f28972-1a4e-4887-8e8c-990f639106bb",
//           type: "RegisterBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementId: "4cfc278e-2a81-446a-8f8b-ddced5dff62a",
//           type: "RegisterBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//       },
//       "Barra 1": 496,
//       "Barra 2": 689,
//       "Ticket 1": null,
//       "Ticket 2": null,
//     },
//     {
//       label: "Retiro n°4",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementId: "285ff112-1638-48b0-8ca3-48996b5a4090",
//           type: "RegisterBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementId: "27916d2e-df7e-469d-a85d-81a806c947b9",
//           type: "RegisterBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//       },
//       "Barra 1": 608,
//       "Barra 2": 300,
//       "Ticket 1": null,
//       "Ticket 2": null,
//     },
//     {
//       label: "Retiro n°5",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementId: "e9394966-2cca-4801-8212-a2ae6b443010",
//           type: "RegisterBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementId: "f01945bc-3499-4007-8776-c9ea903c0226",
//           type: "RegisterBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//       },
//       "Barra 1": 123123,
//       "Barra 2": 5000,
//       "Ticket 1": null,
//       "Ticket 2": null,
//     },
//     {
//       label: "Retiro n°6",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementId: null,
//           type: "RegisterBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementId: null,
//           type: "RegisterBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementId: null,
//           type: "RegisterTicket",
//         },
//       },
//       "Barra 1": null,
//       "Barra 2": null,
//       "Ticket 1": null,
//       "Ticket 2": null,
//     },
//     {
//       label: "Suma Retiros",
//       "Barra 1": 125699,
//       "Barra 2": 6661,
//       "Ticket 1": 965,
//       "Ticket 2": 891,
//     },
//     {
//       label: "Retiro final",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementFinishId: "e0150fdb-b740-4a9e-98fb-45831e348108",
//           type: "registerBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementFinishId: "cf489e31-12ec-4d4f-ae72-6f5e00bc2cab",
//           type: "registerBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementFinishId: "dbfb1a05-e243-4096-a736-71e723d7ea2d",
//           type: "registerTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementFinishId: "950f9ce4-e981-4d33-b994-52e09bcf7c38",
//           type: "registerTicket",
//         },
//       },
//       "Barra 1": 494,
//       "Barra 2": 139,
//       "Ticket 1": 118,
//       "Ticket 2": 778,
//     },
//     {
//       label: "Gastos de barras",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementFinishId: "e0150fdb-b740-4a9e-98fb-45831e348108",
//           type: "registerBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementFinishId: "cf489e31-12ec-4d4f-ae72-6f5e00bc2cab",
//           type: "registerBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementFinishId: "dbfb1a05-e243-4096-a736-71e723d7ea2d",
//           type: "registerTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementFinishId: "950f9ce4-e981-4d33-b994-52e09bcf7c38",
//           type: "registerTicket",
//         },
//       },
//       "Barra 1": 754,
//       "Barra 2": 445,
//       "Ticket 1": 821,
//       "Ticket 2": 575,
//     },
//     {
//       label: "Total efectivo",
//       "Barra 1": 126947,
//       "Barra 2": 7245,
//       "Ticket 1": 1904,
//       "Ticket 2": 2244,
//     },
//     {
//       label: "Postnet Mercado Pago",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementFinishId: "e0150fdb-b740-4a9e-98fb-45831e348108",
//           type: "registerBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementFinishId: "cf489e31-12ec-4d4f-ae72-6f5e00bc2cab",
//           type: "registerBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementFinishId: "dbfb1a05-e243-4096-a736-71e723d7ea2d",
//           type: "registerTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementFinishId: "950f9ce4-e981-4d33-b994-52e09bcf7c38",
//           type: "registerTicket",
//         },
//       },
//       "Barra 1": 293,
//       "Barra 2": 535,
//       "Ticket 1": 22,
//       "Ticket 2": 849,
//     },
//     {
//       label: "Postnet Banco",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementFinishId: "e0150fdb-b740-4a9e-98fb-45831e348108",
//           type: "registerBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementFinishId: "cf489e31-12ec-4d4f-ae72-6f5e00bc2cab",
//           type: "registerBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementFinishId: "dbfb1a05-e243-4096-a736-71e723d7ea2d",
//           type: "registerTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementFinishId: "950f9ce4-e981-4d33-b994-52e09bcf7c38",
//           type: "registerTicket",
//         },
//       },
//       "Barra 1": 343,
//       "Barra 2": 365,
//       "Ticket 1": 987,
//       "Ticket 2": 507,
//     },
//     {
//       label: "Transferencias",
//       data: {
//         "Barra 1": {
//           RegisterId: "708dd60e-1377-4bc5-9405-b8f9f272a29c",
//           RetirementFinishId: "e0150fdb-b740-4a9e-98fb-45831e348108",
//           type: "registerBar",
//         },
//         "Barra 2": {
//           RegisterId: "f69a8859-33ee-427a-b20a-3425cddf3d4f",
//           RetirementFinishId: "cf489e31-12ec-4d4f-ae72-6f5e00bc2cab",
//           type: "registerBar",
//         },
//         "Ticket 1": {
//           RegisterId: "bda73f69-8e02-477b-ae35-eea4bcf261aa",
//           RetirementFinishId: "dbfb1a05-e243-4096-a736-71e723d7ea2d",
//           type: "registerTicket",
//         },
//         "Ticket 2": {
//           RegisterId: "5656fd3b-3e9d-4dc7-827f-669859534f35",
//           RetirementFinishId: "950f9ce4-e981-4d33-b994-52e09bcf7c38",
//           type: "registerTicket",
//         },
//       },
//       "Barra 1": 14,
//       "Barra 2": 628,
//       "Ticket 1": 641,
//       "Ticket 2": 847,
//     },
//     {
//       label: "Facturación total",
//       "Barra 1": 127597,
//       "Barra 2": 8773,
//       "Ticket 1": 3554,
//       "Ticket 2": 4447,
//     },
//   ],
// },
