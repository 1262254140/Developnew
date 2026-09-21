// ==================== RAW DATA SETS ====================
const booksData = [
    { id: "B001", title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", total: 5, available: 4, status: "Available" },
    { id: "B002", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", total: 3, available: 1, status: "Available" },
    { id: "B003", title: "Introduction to Algorithms", author: "Cormen et al.", category: "Technology", total: 4, available: 0, status: "Out of Stock" },
    { id: "B004", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", total: 6, available: 6, status: "Available" },
    { id: "B005", title: "Clean Code", author: "Robert C. Martin", category: "Technology", total: 3, available: 2, status: "Available" }
];

const membersData = [
    { id: "M001", name: "Rahul Sharma", type: "Student", email: "rahul@example.com", phone: "9876543210", issuedCount: 2 },
    { id: "M002", name: "Priya Patel", type: "Faculty", email: "priya@example.com", phone: "9812345678", issuedCount: 1 },
    { id: "M003", name: "Amit Verma", type: "Student", email: "amit@example.com", phone: "9123456789", issuedCount: 0 },
    { id: "M004", name: "Sneha Reddy", type: "Student", email: "sneha@example.com", phone: "8887776665", issuedCount: 1 }
];

const issuesData = [
    { issueId: "I101", book: "Introduction to Algorithms", member: "Rahul Sharma", issueDate: "2026-09-01", dueDate: "2026-09-15", returnDate: "2026-09-14", status: "Returned" },
    { issueId: "I102", book: "The Catcher in the Rye", member: "Rahul Sharma", issueDate: "2026-09-10", dueDate: "2026-09-24", returnDate: "-", status: "Issued" },
    { issueId: "I103", book: "A Brief History of Time", member: "Priya Patel", issueDate: "2026-08-20", dueDate: "2026-09-03", returnDate: "-", status: "Overdue" },
    { issueId: "I104", book: "Clean Code", member: "Sneha Reddy", issueDate: "2026-09-15", dueDate: "2026-09-29", returnDate: "-", status: "Issued" }
];

const finesData = [
    { fineId: "F201", issueId: "I103", member: "Priya Patel", lateDays: 18, amount: 180, status: "Unpaid" },
    { fineId: "F202", issueId: "I101", member: "Rahul Sharma", lateDays: 0, amount: 0, status: "Paid" }
];

const recentActivityData = [
    "Rahul Sharma returned 'Introduction to Algorithms'",
    "Sneha Reddy issued 'Clean Code'",
    "New member registered: Sneha Reddy",
    "Fine generated for Priya Patel (B002 Overdue)"
];

// ==================== APP RENDER LAYER ====================
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderAllData();
});

// SIDEBAR PAGES NAVIGATION ROUTER
function initNavigation() {
    const navButtons = document.querySelectorAll(".sidebar .nav");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("pageTitle");

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetPage = button.getAttribute("data-page");

            // Toggle active tracking layouts
            navButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Manage visible container states
            pages.forEach(page => {
                if (page.id === targetPage) {
                    page.classList.remove("hidden");
                } else {
                    page.classList.add("hidden");
                }
            });

            // Set top context header text
            pageTitle.innerText = button.innerText;
        });
    });
}

// PIPELINE INTERFACE REPOPULATION
function renderAllData() {
    // 1. Dashboard Metrics Calculations
    document.getElementById("totalBooks").innerText = booksData.reduce((acc, b) => acc + b.total, 0);
    document.getElementById("availableBooks").innerText = booksData.reduce((acc, b) => acc + b.available, 0);
    document.getElementById("totalMembers").innerText = membersData.length;
    document.getElementById("issuedBooks").innerText = issuesData.filter(i => i.status === "Issued" || i.status === "Overdue").length;
    document.getElementById("unpaidFines").innerText = "₹" + finesData.filter(f => f.status === "Unpaid").reduce((acc, f) => acc + f.amount, 0);

    // 2. Dashboard Activity Logs
    const activityContainer = document.getElementById("recentActivity");
    if(activityContainer) {
        activityContainer.innerHTML = recentActivityData.map(act => `<div class="activity-item">🔹 ${act}</div>`).join('');
    }

    // 3. Render Books Catalog Table
    const booksTable = document.getElementById("booksTable");
    if(booksTable) {
        booksTable.innerHTML = booksData.map(b => `
            <tr>
                <td>${b.id}</td>
                <td><strong>${b.title}</strong></td>
                <td>${b.author}</td>
                <td>${b.category}</td>
                <td>${b.total}</td>
                <td>${b.available}</td>
                <td><span class="badge ${b.status.toLowerCase().replace(/ /g, '-')}">${b.status}</span></td>
            </tr>
        `).join('');
    }

    // 4. Render Members Matrix Table
    const membersTable = document.getElementById("membersTable");
    if(membersTable) {
        membersTable.innerHTML = membersData.map(m => `
            <tr>
                <td>${m.id}</td>
                <td><strong>${m.name}</strong></td>
                <td>${m.type}</td>
                <td>${m.email}</td>
                <td>${m.phone}</td>
                <td>${m.issuedCount}</td>
            </tr>
        `).join('');
    }

    // 5. Render Lending Ledger Table
    const issuesTable = document.getElementById("issuesTable");
    if(issuesTable) {
        issuesTable.innerHTML = issuesData.map(i => `
            <tr>
                <td>${i.issueId}</td>
                <td><strong>${i.book}</strong></td>
                <td>${i.member}</td>
                <td>${i.issueDate}</td>
                <td>${i.dueDate}</td>
                <td>${i.returnDate}</td>
                <td><span class="badge ${i.status.toLowerCase()}">${i.status}</span></td>
            </tr>
        `).join('');
    }

    // 6. Render Fines Ledger Table
    const finesTable = document.getElementById("finesTable");
    if(finesTable) {
        finesTable.innerHTML = finesData.map(f => `
            <tr>
                <td>${f.fineId}</td>
                <td>${f.issueId}</td>
                <td>${f.member}</td>
                <td>${f.lateDays} Days</td>
                <td>₹${f.amount}</td>
                <td><span class="badge ${f.status.toLowerCase()}">${f.status}</span></td>
            </tr>
        `).join('');
    }

    // 7. Dynamic Reports Generation
    renderReports();
}

// COMPUTED ANALYTICS GENERATION (REPORTS MODULE)
function renderReports() {
    const categories = [...new Set(booksData.map(b => b.category))];
    document.getElementById("categoryCount").innerText = categories.length;
    document.getElementById("overdueCount").innerText = issuesData.filter(i => i.status === "Overdue").length;
    document.getElementById("totalFine").innerText = "₹" + finesData.reduce((acc, f) => acc + f.amount, 0);

    const reportContainer = document.getElementById("categoryReport");
    if(reportContainer) {
        // Calculate items per distinct classification group
        const groupCounts = {};
        booksData.forEach(b => {
            groupCounts[b.category] = (groupCounts[b.category] || 0) + b.total;
        });

        reportContainer.innerHTML = Object.keys(groupCounts).map(cat => `
            <div class="report-item">
                <span><strong>${cat}</strong> Books Inventory Volume</span>
                <span>${groupCounts[cat]} Volumes</span>
            </div>
        `).join('');
    }
}

// ==================== INTERACTION ACTION DIALOGS (MODALS) ====================
function openBookForm() { displayModal("<h3>Add New Book Asset</h3><p>Form fields for parsing title, author, and categorization vectors will display here.</p>"); }
function openMemberForm() { displayModal("<h3>Register New Member</h3><p>Form fields parsing user credentials and notification routes will display here.</p>"); }
function openIssueForm() { displayModal("<h3>Create New Book Issue Record</h3><p>Assignment engine processing catalog targets to member rows.</p>"); }
function openReturnForm() { displayModal("<h3>Process Return Transaction</h3><p>Clearing operation processing checkout return loops.</p>"); }

function displayModal(htmlContent) {
    document.getElementById("modalContent").innerHTML = htmlContent;
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
     }
