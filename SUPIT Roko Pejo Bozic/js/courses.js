/**
 * Course management module for handling curriculum and course selection
 */

// API endpoints
const API_ENDPOINTS = {
    CURRICULUM_LIST: 'https://www.fulek.com/data/api/supit/curriculum-list/en',
    COURSE_DETAILS: 'https://www.fulek.com/data/api/supit/get-curriculum/'
};

// Global state
let allCourses = [];
let selectedCourses = [];

// Initialize when document is ready
$(document).ready(function () {
    initializeCourses();
    setupEventListeners();
});

/**
 * Sets up event listeners for the course table
 */
function setupEventListeners() {
    // Use event delegation for the remove button
    $(document).on('click', '.remove-course', function() {
        const row = $(this).closest('tr');
        const courseId = parseInt(row.data('id'));
        
        // Remove from selected courses array
        selectedCourses = selectedCourses.filter(c => c.id !== courseId);
        
        // Remove the row from the table
        row.remove();
        
        // Update totals
        updateTotals();
    });
}

/**
 * Initializes the courses module and checks authentication
 */
async function initializeCourses() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        alert("You need to log in to access courses.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(API_ENDPOINTS.CURRICULUM_LIST, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            await handleAuthError(response);
            return;
        }

        const data = await response.json();
        allCourses = data.data;
        setupAutocomplete();
    } catch (error) {
        console.error('❌ Failed to load courses:', error);
        alert('Failed to load courses.');
    }
}

/**
 * Sets up the autocomplete functionality for course search
 */
function setupAutocomplete() {
    const courseNames = allCourses.map(course => course.course);

    $("#courseSearch").autocomplete({
        source: courseNames,
        select: function (event, ui) {
            const selectedCourse = allCourses.find(c => c.course === ui.item.value);
            if (selectedCourse) {
                getCourseDetails(selectedCourse.id);
            }
            $(this).val('');
            return false;
        }
    });
}

/**
 * Fetches detailed information for a specific course
 * @param {number} courseId - The ID of the course to fetch
 */
async function getCourseDetails(courseId) {
    const token = localStorage.getItem('jwtToken');
    
    try {
        const response = await fetch(`${API_ENDPOINTS.COURSE_DETAILS}${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            await handleAuthError(response);
            return;
        }

        const data = await response.json();
        if (data?.data) {
            addCourseToTable(data.data);
        } else {
            console.error('⚠ Invalid course details structure.');
        }
    } catch (error) {
        console.error('❌ Failed to load course details:', error);
    }
}

/**
 * Adds a course to the selection table
 * @param {Object} course - The course object to add
 */
function addCourseToTable(course) {
    if (selectedCourses.find(c => c.id === course.id)) {
        alert('Course already added.');
        return;
    }

    selectedCourses.push(course);

    $('#coursesTable tbody').append(`
        <tr data-id="${course.id}">
            <td>${course.kolegij}</td>
            <td>${course.ects}</td>
            <td>${course.sati}</td>
            <td>${course.predavanja}</td>
            <td>${course.vjezbe}</td>
            <td>${course.tip}</td>
            <td>${course.semestar}</td>
            <td><button class="btn btn-danger btn-sm remove-course">Remove</button></td>
        </tr>
    `);

    updateTotals();
}

/**
 * Updates the totals row in the courses table
 */
function updateTotals() {
    const total = selectedCourses.reduce((acc, c) => {
        acc.ects += c.ects;
        acc.sati += c.sati;
        acc.predavanja += c.predavanja;
        acc.vjezbe += c.vjezbe;
        return acc;
    }, { ects: 0, sati: 0, predavanja: 0, vjezbe: 0 });

    // Remove old summary if exists
    $('#coursesTable tfoot').remove();

    // Append new summary row
    $('#coursesTable').append(`
        <tfoot class="fw-bold">
            <tr>
                <td>Total</td>
                <td>${total.ects}</td>
                <td>${total.sati}</td>
                <td>${total.predavanja}</td>
                <td>${total.vjezbe}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    `);
}

/**
 * Handles authentication errors
 * @param {Response} response - The failed response object
 */
async function handleAuthError(response) {
    if (response.status === 401) {
        localStorage.removeItem('jwtToken');
        alert("Session expired. Please log in again.");
        window.location.href = "login.html";
        throw new Error("Unauthorized");
    } else {
        alert("An error occurred.");
        throw new Error(`HTTP error ${response.status}`);
    }
}

