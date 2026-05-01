// Core AI Logic - Pattern Matching
function generateResponse(query) {
    const q = query.toLowerCase();

    // 1. Election Process / How to Vote
    if (q.includes('how to vote') || q.includes('how do i vote') || q.includes('process')) {
        return `
            <h4 class="font-bold text-lg mb-2 text-indigo-700">📝 How to Vote: Step-by-Step</h4>
            <p class="mb-2"><strong>1. Explanation:</strong> Voting in India is a simple and secure process using EVMs (Electronic Voting Machines).</p>
            <p class="mb-1"><strong>2. Steps:</strong></p>
            <ul class="list-disc pl-5 mb-2 space-y-1">
                <li>Check your name in the voter list online (ECINET).</li>
                <li>Go to your designated polling booth on election day.</li>
                <li>Show your Voter ID (EPIC) or approved ID to the polling officer.</li>
                <li>Proceed to the voting compartment, press the blue button on the EVM next to your choice.</li>
                <li>Listen for the beep and check the VVPAT slip for verification.</li>
            </ul>
            <p class="mb-2 text-sm text-gray-600"><strong>3. Example:</strong> If you are in Chennai, you can find your exact booth on the TN Election Commission portal.</p>
            <p class="text-sm italic text-indigo-600">4. Follow-up question: Would you like to know what documents are valid instead of a Voter ID?</p>
        `;
    }

    // 2. Timeline
    if (q.includes('timeline') || q.includes('schedule') || q.includes('when')) {
        return `
            <h4 class="font-bold text-lg mb-2 text-indigo-700">📅 Election Timeline</h4>
            <p class="mb-2"><strong>1. Explanation:</strong> The Election Commission of India (ECI) follows a strict schedule for fair elections.</p>
            <p class="mb-1"><strong>2. Steps (Standard Timeline):</strong></p>
            <ul class="list-disc pl-5 mb-2 space-y-1">
                <li><strong>Announcement:</strong> ECI announces dates and the Model Code of Conduct begins.</li>
                <li><strong>Nominations:</strong> Candidates file their papers.</li>
                <li><strong>Campaigning:</strong> Candidates promote their agenda (ends 48 hours before voting).</li>
                <li><strong>Voting Day:</strong> Citizens cast their votes.</li>
                <li><strong>Counting & Results:</strong> Votes are counted and winners declared.</li>
            </ul>
            <p class="text-sm italic text-indigo-600">4. Follow-up question: Are you looking for the specific timeline for the upcoming Tamil Nadu elections?</p>
        `;
    }

    // 3. First-time voter
    if (q.includes('first') || q.includes('first-time') || q.includes('register')) {
        return `
            <h4 class="font-bold text-lg mb-2 text-indigo-700">🌟 First-Time Voter Guide</h4>
            <p class="mb-2"><strong>1. Explanation:</strong> If you are an Indian citizen aged 18 or above, you are eligible to vote!</p>
            <p class="mb-1"><strong>2. Steps to Register:</strong></p>
            <ul class="list-disc pl-5 mb-2 space-y-1">
                <li>Visit the ECINET portal or Voter Portal.</li>
                <li>Fill out <strong>Form 6</strong> for new voter registration.</li>
                <li>Upload age proof (Aadhaar, Birth Certificate) and address proof.</li>
                <li>Submit and track your application status online.</li>
            </ul>
            <p class="mb-2 text-sm text-gray-600"><strong>3. Example:</strong> Many first-time voters use the Voter Helpline App to easily register from their phones.</p>
            <p class="text-sm italic text-indigo-600">4. Follow-up question: Do you need help finding the Form 6 link?</p>
        `;
    }

    // 4. ECINET Awareness
    if (q.includes('ecinet')) {
        return `
            <h4 class="font-bold text-lg mb-2 text-indigo-700">💻 ECINET Awareness</h4>
            <p class="mb-2"><strong>1. Explanation:</strong> ECINET is the digital backbone of the Election Commission, providing various online services to voters.</p>
            <p class="mb-1"><strong>2. Features:</strong></p>
            <ul class="list-disc pl-5 mb-2 space-y-1">
                <li>Online voter registration (Form 6).</li>
                <li>Correction of entries in the electoral roll (Form 8).</li>
                <li>Search your name in the Voter List.</li>
                <li>Download e-EPIC (Digital Voter ID).</li>
            </ul>
            <p class="mb-2 text-sm text-gray-600"><strong>3. Example:</strong> Instead of visiting an office, you can update your address instantly using ECINET.</p>
            <p class="text-sm italic text-indigo-600">4. Follow-up question: Would you like to know how to download your e-EPIC card?</p>
        `;
    }

    // 5. Tamil Nadu specific
    if (q.includes('tn') || q.includes('tamil nadu') || q.includes('check voter list') || q.includes('find polling booth') || q.includes('documents')) {
        return `
            <h4 class="font-bold text-lg mb-2 text-indigo-700">📍 Tamil Nadu Voter Guide</h4>
            <p class="mb-2"><strong>1. Explanation:</strong> The Chief Electoral Officer (CEO) of Tamil Nadu provides a dedicated portal for local voters.</p>
            <p class="mb-1"><strong>2. Important Actions:</strong></p>
            <ul class="list-disc pl-5 mb-2 space-y-1">
                <li><strong>Check Voter List:</strong> Visit <code>elections.tn.gov.in</code> to search by EPIC number.</li>
                <li><strong>Find Polling Booth:</strong> Send an SMS or use the Voter Helpline App.</li>
                <li><strong>Required Documents:</strong> EPIC (Voter ID), Aadhaar, PAN Card, Driving License, or Indian Passport.</li>
            </ul>
            <p class="mb-2 text-sm text-gray-600"><strong>3. Example:</strong> Even if you lost your Voter ID, you can vote in TN by showing your Aadhaar card if your name is on the list.</p>
            <p class="text-sm italic text-indigo-600">4. Follow-up question: Do you need the exact SMS format to find your polling booth?</p>
        `;
    }

    // Default Fallback
    return `
        <p class="mb-2">I am here to help you with the election process, voting steps, ECINET, and guidelines for Tamil Nadu voters. I maintain complete neutrality and do not endorse any political party.</p>
        <p class="mb-1">Could you please ask about:</p>
        <ul class="list-disc pl-5 space-y-1">
            <li>How to vote</li>
            <li>Election timeline</li>
            <li>First-time voter registration</li>
            <li>What is ECINET</li>
            <li>Tamil Nadu voter list</li>
        </ul>
    `;
}

// Universal Module Export (supports both Node.js and Browser)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateResponse };
}
if (typeof window !== 'undefined') {
    window.generateResponse = generateResponse;
}
