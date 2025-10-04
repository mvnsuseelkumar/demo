import pytest
from backend.app import app
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_suggest_careers_no_skills(client):
    """
    Test that the /api/chat/suggest-careers endpoint returns a 400 error
    when the skills list is empty.
    """
    response = client.post('/api/chat/suggest-careers',
                           data=json.dumps({'skills': []}),
                           content_type='application/json')

    assert response.status_code == 400
    json_data = json.loads(response.data)
    assert json_data['error'] == "Skills are required to suggest careers."