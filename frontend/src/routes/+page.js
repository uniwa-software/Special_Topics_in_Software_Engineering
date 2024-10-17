export async function load() {
    try {
        const res = await fetch('http://localhost:3000/api/users');
        const resa = await fetch('http://localhost:3000/api/appointments');
        if ((!res.ok) || (!resa.ok)) {
            throw new Error('Failed to fetch');
        }
        const users = await res.json();
        const appointments = await resa.json();
        return {
            users,
            appointments
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            users: [],
            appointmetns: []
        };
    }
}
